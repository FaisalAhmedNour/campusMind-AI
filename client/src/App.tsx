
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AssignmentSummary from './pages/AssignmentSummary';
import VivaGenerator from './pages/VivaGenerator';
import AutoGrader from './pages/AutoGrader';
import NoticeSimplifier from './pages/NoticeSimplifier';
import AiChat from './pages/AiChat';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="summary" element={<AssignmentSummary />} />
                    <Route path="viva" element={<VivaGenerator />} />
                    <Route path="grade" element={<AutoGrader />} />
                    <Route path="simplify" element={<NoticeSimplifier />} />
                    <Route path="chat" element={<AiChat />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
