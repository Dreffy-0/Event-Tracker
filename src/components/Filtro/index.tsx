import React, { useState } from "react";
import style from "./Filtro.module.scss";
import { useSetRecoilState } from "recoil";
import { IFiltroDeEventos } from "../../interfaces/IFiltroDeEventos";
import { filtroDeEventos } from "../../state/atom";
import { IFiltroStatus } from "../../interfaces/IFiltrosStatus";

const Filtro: React.FC = () => {
	const [data, setData] = useState("");
	const [status, setStatus] = useState<IFiltroStatus>("Ambos");
	const setFiltroDeEvento =
		useSetRecoilState<IFiltroDeEventos>(filtroDeEventos);

	const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
		const filtro: IFiltroDeEventos = {
			status,
		};
		if (data) {
			filtro.data = new Date(data);
		} else {
			filtro.data = null;
		}
		setFiltroDeEvento(filtro);
	};

	const opcoesFiltro = ["Ambos", "Completos", "Incompletos"];

	return (
		<form className={style.Filtro} onSubmit={submeterForm}>
			<h3 className={style.titulo}>Filtrar por data</h3>
			<input
				type="date"
				name="data"
				className={style.input}
				onChange={evento => setData(evento.target.value)}
				placeholder="Por data"
				value={data}
			/>
			<select
				name="status"
				id="filtro-status"
				className={style.input}
				onChange={event =>
					setStatus(event.target.value as IFiltroStatus)
				}
			>
				{opcoesFiltro.map((opcao, index) => (
					<option key={index} value={opcao}>
						{opcao}
					</option>
				))}
			</select>

			<button className={style.botao}>Filtrar</button>
		</form>
	);
};

export default Filtro;
