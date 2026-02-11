import { useState, useRef, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Typography,
    Paper,
    Avatar,
    CircularProgress,
    Container,
    Stack,
    Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const AiChat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm your academic assistant. How can I help you with your studies today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input.trim(),
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/ai/chat', {
                prompt: input.trim()
            });

            if (response.data.success) {
                const aiMessage: Message = {
                    id: Date.now() + 1,
                    text: response.data.data,
                    sender: 'ai',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                throw new Error('Unsuccessful AI response');
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Container maxWidth="md" sx={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom component="h1" sx={{ mt: 2 }}>
                AI Academic Assistant
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    flexGrow: 1,
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: 2
                }}
            >
                {/* Scrollable Chat Area */}
                <Box
                    ref={scrollRef}
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        overflowY: 'auto',
                        bgcolor: '#f5f7fb',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    {messages.map((msg) => (
                        <Box
                            key={msg.id}
                            sx={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                display: 'flex',
                                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                                gap: 1
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main',
                                    width: 32,
                                    height: 32
                                }}
                            >
                                {msg.sender === 'user' ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
                            </Avatar>
                            <Paper
                                sx={{
                                    p: 1.5,
                                    borderRadius: 2,
                                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'white',
                                    color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 10,
                                        [msg.sender === 'user' ? 'right' : 'left']: -6,
                                        borderTop: '6px solid transparent',
                                        borderBottom: '6px solid transparent',
                                        [msg.sender === 'user' ? 'borderLeft' : 'borderRight']: `6px solid ${msg.sender === 'user' ? '#1976d2' : 'white'}`
                                    }
                                }}
                            >
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {msg.text}
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7, textAlign: 'right' }}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Typography>
                            </Paper>
                        </Box>
                    ))}

                    {loading && (
                        <Box sx={{ alignSelf: 'flex-start', display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                                <SmartToyIcon fontSize="small" />
                            </Avatar>
                            <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: 'white' }}>
                                <Box className="ai-thinking">
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>AI assistant is typing</Typography>
                                </Box>
                            </Paper>
                        </Box>
                    )}
                </Box>

                <Divider />

                {/* Input Area */}
                <Box sx={{ p: 2, bgcolor: 'white' }}>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            fullWidth
                            multiline
                            maxRows={4}
                            placeholder="Ask something academic..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                            variant="outlined"
                            size="small"
                        />
                        <IconButton
                            color="primary"
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            sx={{ alignSelf: 'flex-end' }}
                        >
                            {loading ? <CircularProgress size={24} /> : <SendIcon />}
                        </IconButton>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default AiChat;
