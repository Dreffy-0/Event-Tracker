import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";
import { IEvento } from "../../interfaces/IEvento";

export const eventosFiltradosState = selector({
	key: "eventosFitradoState",
	get: ({ get }) => {
		const filtro = get(filtroDeEventos);
		const todosEventos = get(listaDeEventosState);
		const eventosComStatus = todosEventos.filter(evento =>
			filtro.status === "Completos"
				? evento.completo
				: filtro.status === "Incompletos"
				? !evento.completo
				: true,
		);
		const eventos = eventosComStatus.filter(evento => {
			if (!filtro.data) {
				return true;
			}
			const ehOMesmoDia =
				filtro.data.toISOString().slice(0, 10) ===
				evento.inicio.toISOString().slice(0, 10);
			return ehOMesmoDia;
		});
		return eventos;
	},
});

export const eventosAsync = selector({
	key: "eventosAsync",
	get: async () => {
		const respostaHttp = await fetch("http://localhost:8080/eventos");
		const eventosJson: IEvento[] = await respostaHttp.json();
		return eventosJson.map(evento => ({
			...evento,
			inicio: new Date(evento.inicio),
			fim: new Date(evento.fim),
		}));
	},
});
