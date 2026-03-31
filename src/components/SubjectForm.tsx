import { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';
import type { SubjectDto } from '../services/subjectApi';

export type SubjectFormValues = Omit<SubjectDto, 'id'> & { id?: number };

type Props = {
  initial?: SubjectFormValues;
  onCancel: () => void;
  onSave: (values: SubjectFormValues) => void;
  onDelete?: () => void;
};

const emptyValues: SubjectFormValues = {
  name: '',
  code: '',
};

export default function SubjectForm({ initial, onCancel, onSave, onDelete }: Props) {
  const [values, setValues] = useState<SubjectFormValues>(initial ?? emptyValues);
  const isEdit = useMemo(() => typeof values.id === 'number', [values.id]);

  const updateField = (key: keyof SubjectFormValues, value: string) => {
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
          label="Name"
          value={values.name}
          onChange={(e) => updateField('name', e.target.value)}
          required
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Code"
          value={values.code ?? ''}
          onChange={(e) => updateField('code', e.target.value)}
          fullWidth
          variant="outlined"
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
