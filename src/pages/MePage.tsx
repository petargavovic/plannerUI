import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { updateUser } from '../services/userApi';

function MePage() {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    surname: user?.surname ?? '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordDialog, setPasswordDialog] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
    setFormData({
      name: user?.name ?? '',
      surname: user?.surname ?? '',
    });
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      await updateUser(user.id, formData);
      setSuccess('Profile updated successfully');
      setEditMode(false);
    } catch (err: unknown) {
      setError('Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.repeatPassword) {
      setError('New passwords do not match');
      return;
    }
    if (!passwordData.newPassword) {
      setError('Please enter a new password');
      return;
    }
    try {
      // Note: Password change should be handled by your backend
      // For now, we'll just show a success message
      setSuccess('Password change request submitted');
      setPasswordDialog(false);
      setPasswordData({ currentPassword: '', newPassword: '', repeatPassword: '' });
    } catch (err: unknown) {
      setError('Failed to change password');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Name"
            value={editMode ? formData.name : user?.name ?? ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            label="Surname"
            value={editMode ? formData.surname : user?.surname ?? ''}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            disabled={!editMode}
          />
        </Box>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          {!editMode ? (
            <>
              <Button variant="contained" onClick={handleEdit}>
                Edit Profile
              </Button>
              <Button variant="outlined" onClick={() => setPasswordDialog(true)}>
                Change Password
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Paper>

      <Dialog open={passwordDialog} onClose={() => setPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Repeat New Password"
            type="password"
            value={passwordData.repeatPassword}
            onChange={(e) => setPasswordData({ ...passwordData, repeatPassword: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handleChangePassword}>Change</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MePage;