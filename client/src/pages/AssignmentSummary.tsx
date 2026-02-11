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

const AssignmentSummary = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        setSummary(null);

        try {
            const response = await axios.post('http://localhost:5000/api/ai/summarize', {
                text: text
            });

            if (response.data.success) {
                setSummary(response.data.data);
            } else {
                setError('Failed to generate summary. The server returned an unsuccessful response.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to summarize assignment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Assignment Summary
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Paste your assignment text below to get a concise summary.
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
                        {loading ? 'Summarizing...' : 'Summarize'}
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

                {summary && (
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Summary Result
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                {summary}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Container>
    );
};

export default AssignmentSummary;
