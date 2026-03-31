import { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';
import type { UserDto } from '../services/userApi';

export type UserFormValues = Omit<UserDto, 'id'> & { id?: number };

type Props = {
  initial?: UserFormValues;
  onCancel: () => void;
  onSave: (values: UserFormValues) => void;
  onDelete?: () => void;
};

const emptyValues: UserFormValues = {
  email: '',
  name: '',
  surname: '',
  admin: false,
};

export default function UserForm({ initial, onCancel, onSave, onDelete }: Props) {
  const [values, setValues] = useState<UserFormValues>(initial ?? emptyValues);
  const isEdit = useMemo(() => typeof values.id === 'number', [values.id]);

  const updateField = (key: keyof UserFormValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => updateField('email', e.target.value)}
          required
          fullWidth
          variant="outlined"
        />

        <TextField
          label="First Name"
          value={values.name ?? ''}
          onChange={(e) => updateField('name', e.target.value)}
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Last Name"
          value={values.surname ?? ''}
          onChange={(e) => updateField('surname', e.target.value)}
          fullWidth
          variant="outlined"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={values.admin ?? false}
              onChange={(e) => updateField('admin', e.target.checked)}
            />
          }
          label="Admin"
        />

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            {isEdit ? 'Save' : 'Create'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
          {isEdit && onDelete ? (
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={onDelete}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
}
