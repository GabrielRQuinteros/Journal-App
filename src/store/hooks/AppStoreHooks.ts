import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'

/// CREADO DE HOOKS QUE HABILITAN EL TIPADO DE LOS STATE CON TYPESCRIPT
/// DISPATCH --> PARA EJECUTAR ACCIONES SOBRE LOS STATE DEL STORE
export const useAppDispatch = () => useDispatch<AppDispatch>();
/// SELECTOR --> PARA CONSULTAR DATOS DE ALGÚN ESTADO DEL STORE
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 