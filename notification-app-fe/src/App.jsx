import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, CssBaseline } from '@mui/material';
import NotificationsPage from './pages/NotificationsPage';
import PriorityPage from './pages/PriorityPage.jsx'; 

function App() {
  return (
    <Router>
      <CssBaseline /> 
      
      <AppBar position="static" sx={{ mb: 4, backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Campus Alerts
          </Typography>
          <Button color="inherit" component={Link} to="/">
            All Notifications
          </Button>
          <Button color="inherit" component={Link} to="/priority">
            Priority Inbox
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<NotificationsPage />} />
          <Route path="/priority" element={<PriorityPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;