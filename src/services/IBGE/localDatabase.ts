import UFs from '../../database/UFs.json';

export function getUFsLocalJson(): { value: any, label: any; }[] {
  const optionsUFs = UFs.map(uf => ({ value: uf.nome, label: uf.nome })); 
  return optionsUFs;
}

