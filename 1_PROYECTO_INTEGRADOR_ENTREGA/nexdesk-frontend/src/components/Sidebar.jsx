import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { menuPorRol } from "../config/menu";

export default function Sidebar({ abierto, cerrar }) {
  const { usuario } = useAuth();
  const opciones = menuPorRol(usuario?.rol);

  return (
    <>
      {abierto && (
        <button
          type="button"
          className="nexdesk-overlay"
          onClick={cerrar}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={`nexdesk-sidebar ${abierto ? "abierto" : ""}`}
        aria-label="Navegación principal"
      >
        <div className="nexdesk-sidebar-brand">
          <img
            src="/imagen-logo-usta.png"
            alt="Escudo USTA Tunja"
            className="nexdesk-usta-logo-mono"
          />
          <div>
            <strong>NEXDESK</strong>
            <small>USTA Tunja · Soporte</small>
          </div>
        </div>

        <div className="nexdesk-sidebar-label">
          MENÚ PRINCIPAL
        </div>

        <nav className="nexdesk-sidebar-nav">
          {opciones.map((opcion) => (
            <NavLink
              key={opcion.ruta}
              to={opcion.ruta}
              onClick={cerrar}
              className={({ isActive }) =>
                `nexdesk-nav-link ${isActive ? "activo" : ""}`
              }
            >
              <span className="nexdesk-nav-icon">
                {opcion.icono}
              </span>
              <span>{opcion.titulo}</span>
            </NavLink>
          ))}
        </nav>

        <div className="nexdesk-sidebar-footer">
          <span className="nexdesk-online-dot" />
          Sistema de soporte · USTA Tunja
          <small>Proyecto Integrador · Ingeniería de Sistemas</small>
        </div>
      </aside>
    </>
  );
}

