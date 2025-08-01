import { create } from "./Create";
import { getAll } from "./GetAll";

export const empresaController = {
    ...create,
    ...getAll
}