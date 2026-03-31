import { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Stack,
} from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';
import type { HallDto } from '../services/hallApi';
import { HallType } from '../services/hallApi';

export type HallFormValues = Omit<HallDto, 'id'> & { id?: number };

type Props = {
  initial?: HallFormValues;
  onCancel: () => void;
  onSave: (values: HallFormValues) => void;
  onDelete?: () => void;
};

const emptyValues: HallFormValues = {
  name: '',
  capacity: 0,
  location: '',
  type: HallType.OTHER,
  equipment: '',
};

export default function HallForm({ initial, onCancel, onSave, onDelete }: Props) {
  const [values, setValues] = useState<HallFormValues>(initial ?? emptyValues);
  const isEdit = useMemo(() => typeof values.id === 'number', [values.id]);

  const updateField = (key: keyof HallFormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: key === 'capacity' ? Number(value) : value,
    }));
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

        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={values.type}
            label="Type"
            onChange={(e) => updateField('type', e.target.value)}
          >
            {Object.values(HallType).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Capacity"
          type="number"
          value={values.capacity ?? 0}
          onChange={(e) => updateField('capacity', e.target.value)}
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Location"
          value={values.location ?? ''}
          onChange={(e) => updateField('location', e.target.value)}
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Equipment"
          value={values.equipment ?? ''}
          onChange={(e) => updateField('equipment', e.target.value)}
          fullWidth
          multiline
          rows={2}
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
