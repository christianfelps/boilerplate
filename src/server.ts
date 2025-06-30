import app from "./app";
import { AppdataSource } from "./database/data_source";

AppdataSource.initialize().then(async () =>{ console.log("Database conectado")
    app.listen(3333, () => console.log("server rodando http://localhost:3333"))
});
