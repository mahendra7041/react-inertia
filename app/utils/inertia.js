import inertia from "express-inertia";
import { inertiaConfig } from "../../configs/inertia.config.js";

export const inertiaMiddleware = await inertia(inertiaConfig);
