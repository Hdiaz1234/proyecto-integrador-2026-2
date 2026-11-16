import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EstadoBackend from "../components/EstadoBackend";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  // 1. Navegación y autenticación
  const navigate = useNavigate();
  const { login } = useAuth();

  // 2. Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recordar, setRecordar] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // 3. Procesar inicio de sesión
  async function manejarLogin(evento) {
    evento.preventDefault();

    setError("");
    setCargando(true);

    // Evitar conservar una bienvenida anterior
    sessionStorage.removeItem(
      "nexdesk_mostrar_bienvenida"
    );

    try {
      // Autenticación mediante la API REST
      const perfil = await login(email, password);

      // Verificar cambio obligatorio de contraseña
      if (
        perfil.debeCambiarPassword ||
        perfil.debe_cambiar_password
      ) {
        navigate("/cambiar-password", {
          replace: true,
        });
      } else {
        // Activar notificación de bienvenida
        sessionStorage.setItem(
          "nexdesk_mostrar_bienvenida",
          "1"
        );

        // Acceder al dashboard
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible iniciar sesión."
      );
    } finally {
      setCargando(false);
    }
  }

  // 4. Interfaz Flat Dark adaptada a NEXDESK
  return (
    <div className="nexdesk-flat-wrapper">
      <div className="nexdesk-flat-card">

        {/* Barra superior estilo ventana */}
        <div className="nexdesk-flat-titlebar">
          <span>NEXDESK · USTA TUNJA</span>
          <div className="nexdesk-flat-controls" aria-hidden="true">
            <span>—</span>
            <span>□</span>
            <span>✕</span>
          </div>
        </div>

        {/* Identidad visual hexagonal */}
        <div className="nexdesk-flat-brand">
          <div className="nexdesk-flat-hex">
            <img
              src="/imagen-logo-usta.png"
              alt="Escudo USTA Tunja"
            />
          </div>

          <h1>NEXDESK</h1>
          <p>SISTEMA INTEGRAL DE SOPORTE TÉCNICO</p>
        </div>

        {/* Mensajes de error */}
        {error && (
          <div className="nexdesk-flat-alert" role="alert">
            {error}
          </div>
        )}

        {/* Formulario Flat con líneas inferiores */}
        <form onSubmit={manejarLogin} className="nexdesk-flat-form">
          <div className="nexdesk-flat-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="usuario@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="nexdesk-flat-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <label className="nexdesk-flat-remember">
            <input
              type="checkbox"
              checked={recordar}
              onChange={(e) => setRecordar(e.target.checked)}
            />
            <span>Recordar sesión</span>
          </label>

          <button
            type="submit"
            className="nexdesk-flat-btn"
            disabled={cargando}
          >
            {cargando ? "Validando..." : "Iniciar sesión"}
          </button>
        </form>

        {/* Verificación del backend y pie */}
        <div className="nexdesk-flat-footer">
          <hr className="nexdesk-flat-divider" />
          <div className="nexdesk-flat-status">
            <EstadoBackend />
          </div>
          <p className="nexdesk-flat-credits">
            Proyecto Integrador · Ingeniería de Sistemas
          </p>
        </div>

      </div>
    </div>
  );
}
