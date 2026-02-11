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
    Alert
} from '@mui/material';
import axios from 'axios';

const VivaGenerator = () => {
    const [text, setText] = useState('');
    const [questions, setQuestions] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        setQuestions(null);

        try {
            const response = await axios.post('http://localhost:5000/api/ai/viva', {
                text: text
            });

            if (response.data.success) {
                setQuestions(response.data.data);
            } else {
                setError('Failed to generate viva questions. The server returned an unsuccessful response.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to generate viva questions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Helper to format the output. If it looks like a list, we can try to make it look nicer,
    // otherwise fallback to pre-wrap text.
    const renderContent = () => {
        if (!questions) return null;

        return (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {questions}
            </Typography>
        );
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Viva Generator
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Paste your assignment text below to generate viva questions.
                    The AI will generate basic, medium, and advanced questions.
                </Typography>

                <TextField
                    fullWidth
                    label="Assignment Text"
                    multiline
                    rows={8}
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste assignment content here..."
                    sx={{ mb: 3 }}
                />

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        disabled={loading || !text.trim()}
                    >
                        {loading ? 'Generating...' : 'Generate Questions'}
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

                {questions && (
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Generated Questions
                            </Typography>
                            {renderContent()}
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Container>
    );
};

export default VivaGenerator;
