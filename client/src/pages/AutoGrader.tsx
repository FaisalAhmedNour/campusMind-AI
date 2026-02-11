import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Alert,
    Grid,
    Paper
} from '@mui/material';
import GradingIcon from '@mui/icons-material/Grading';
import axios from 'axios';

const AutoGrader = () => {
    const [question, setQuestion] = useState('');
    const [modelAnswer, setModelAnswer] = useState('');
    const [studentAnswer, setStudentAnswer] = useState('');

    const [result, setResult] = useState<string | null>(null);
    const [score, setScore] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!question.trim() || !modelAnswer.trim() || !studentAnswer.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);
        setScore(null);

        try {
            const response = await axios.post('http://localhost:5000/api/ai/grade', {
                question,
                modelAnswer,
                studentAnswer
            });

            if (response.data.success) {
                const data = response.data.data;
                setResult(data);

                // Try to extract score (e.g., "Score: 8/10" or "8/10")
                const scoreMatch = data.match(/(?:Score:?\s*)?(\d+(?:\.\d+)?\s*\/\s*\d+)/i);
                if (scoreMatch) {
                    setScore(scoreMatch[1]);
                }
            } else {
                setError('Failed to grade answer. The server returned an unsuccessful response.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to grade answer. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Auto Grader
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Compare a student's answer against a model answer to get an automated grade and feedback.
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Question"
                            variant="outlined"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Enter the question here..."
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Model Answer"
                            multiline
                            rows={6}
                            variant="outlined"
                            value={modelAnswer}
                            onChange={(e) => setModelAnswer(e.target.value)}
                            placeholder="Enter the correct/model answer..."
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Student Answer"
                            multiline
                            rows={6}
                            variant="outlined"
                            value={studentAnswer}
                            onChange={(e) => setStudentAnswer(e.target.value)}
                            placeholder="Enter the student's answer..."
                        />
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        disabled={loading || !question.trim() || !modelAnswer.trim() || !studentAnswer.trim()}
                        startIcon={!loading && <GradingIcon />}
                    >
                        {loading ? 'Grading...' : 'Grade Answer'}
                    </Button>
                    {loading && (
                        <Box className="ai-thinking">
                            <CircularProgress size={24} color="inherit" />
                            <Typography variant="body2">AI is thinking</Typography>
                        </Box>
                    )}
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {result && (
                    <Card elevation={3} sx={{ bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    Calculated Score
                                </Typography>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        borderRadius: '50%',
                                        width: 120,
                                        height: 120,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Typography variant="h3" component="div" fontWeight="bold">
                                        {score || '?'}
                                    </Typography>
                                </Paper>
                            </Box>

                            <Typography variant="h6" gutterBottom color="primary">
                                Feedback & Explanation
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                {result}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Container>
    );
};

export default AutoGrader;
