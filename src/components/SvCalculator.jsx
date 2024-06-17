import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const SvCalculator = ({onCostChange}) => {
  const [spki, setSpki] = useState('');
  const [su, setSu] = useState('');
  const [kvk, setKvk] = useState('');
  const [k, setK] = useState('');
  const [kind, setKind] = useState('');
  const [result, setResult] = useState(null);

  const calculateSv = () => {
    const sv = (parseFloat(spki) + (parseFloat(su) * parseFloat(kvk))) * parseFloat(k) * parseFloat(kind);
    setResult(sv);
    onCostChange(sv);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h5">Калькулятор для вычисления Стоимости</Typography>
      <TextField
        label="Спк_i"
        type="number"
        value={spki}
        onChange={(e) => setSpki(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Су"
        type="number"
        value={su}
        onChange={(e) => setSu(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="коэффициент годовой доходности земельных угодий"
        type="number"
        value={kvk}
        onChange={(e) => setKvk(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Количество саженцев"
        type="number"
        value={k}
        onChange={(e) => setK(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Коэффициент годовой индексации"
        type="number"
        value={kind}
        onChange={(e) => setKind(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 1 }}
      />
      <Button onClick={calculateSv} variant="contained" color="success" fullWidth>
        Вычислить
      </Button>
      {result !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>Св = {result}</Typography>
      )}
    </Box>
  );
};

export default SvCalculator;
