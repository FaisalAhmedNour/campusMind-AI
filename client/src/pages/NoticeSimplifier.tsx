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
    Divider
} from '@mui/material';
import TransformIcon from '@mui/icons-material/Transform';
import axios from 'axios';

const NoticeSimplifier = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post('http://localhost:5000/api/ai/simplify', {
                text: text
            });

            if (response.data.success) {
                setResult(response.data.data);
            } else {
                setError('Failed to simplify notice. The server returned an unsuccessful response.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to simplify notice. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Notice Simplifier
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Paste complex official notices below to get a simplified version with key deadlines and action items.
                </Typography>

                <TextField
                    fullWidth
                    label="Official Notice Text"
                    multiline
                    rows={10}
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste the notice content here..."
                    sx={{ mb: 3 }}
                />

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        disabled={loading || !text.trim()}
                        startIcon={!loading && <TransformIcon />}
                    >
                        {loading ? 'Simplifying...' : 'Simplify Notice'}
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
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom color="primary">
                                Simplified Notice
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                {result}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Container>
    );
};

export default NoticeSimplifier;
