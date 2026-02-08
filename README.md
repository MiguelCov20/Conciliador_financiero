# 🧾 AI-Powered Financial Reconciliation Platform

## 📌 Descripción General

Esta aplicación es una **plataforma web para la conciliación automática de datos financieros**, diseñada para integrar, normalizar y comparar información proveniente de distintas fuentes financieras (por ejemplo, estados bancarios y reportes internos).

El sistema incorpora **Inteligencia Artificial** para detectar inconsistencias, clasificar movimientos financieros y generar explicaciones automáticas que facilitan la toma de decisiones.

Este proyecto fue desarrollado como **Proyecto Modular de Titulación** para la carrera de **Ingeniería en Informática**, integrando conocimientos de bases de datos, programación, arquitectura de software, análisis de datos e inteligencia artificial.

---

## 🎯 Objetivos del Proyecto

### Objetivo General
Desarrollar una **webapp robusta y escalable** que permita realizar conciliaciones financieras automáticas mediante el uso de bases de datos estructuradas y modelos de inteligencia artificial.

### Objetivos Específicos
- Centralizar información financiera proveniente de múltiples fuentes.
- Automatizar el proceso de conciliación de movimientos financieros.
- Detectar anomalías y movimientos no conciliados mediante IA.
- Proveer una interfaz web moderna, responsiva y fácil de usar.
- Demostrar competencias técnicas adquiridas durante la carrera.

---

## 🧠 Funcionalidades Principales

- 📤 Carga de archivos financieros (CSV / XLSX)
- 🔄 Normalización y almacenamiento de datos
- 🔍 Conciliación automática de movimientos
- 🤖 Clasificación inteligente de transacciones
- ⚠️ Detección de anomalías y duplicados
- 🧾 Explicaciones automáticas de diferencias
- 📊 Dashboard con métricas financieras
- 🔐 Autenticación de usuarios
- 🧩 Automatización de procesos con workflows

---

## 🤖 Inteligencia Artificial

El sistema utiliza **modelos de IA gratuitos y de código abierto**, principalmente para:

- Clasificación de descripciones bancarias.
- Detección de patrones anómalos en transacciones.
- Análisis semántico de movimientos financieros.
- Generación de explicaciones en lenguaje natural.

### Tecnologías de IA
- Hugging Face Transformers
- Sentence Transformers
- Scikit-learn
- Modelos preentrenados (BERT / DistilBERT)

---

## 🧱 Arquitectura del Sistema

La aplicación sigue una arquitectura **cliente-servidor desacoplada**:

```
[ Frontend (Next.js) ]
          |
          v
[ Backend API (FastAPI / Django) ]
          |
          v
[ Base de Datos (PostgreSQL / MongoDB) ]
          |
          v
[ IA & Automatización (Python / n8n) ]
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Python (FastAPI / Django)
- REST API
- JWT Authentication

### Bases de Datos
- PostgreSQL (datos estructurados)
- MongoDB (logs y datos crudos)

### Inteligencia Artificial
- Python
- Hugging Face
- Scikit-learn
- Pandas / NumPy

### Automatización
- n8n

### Otros
- Docker
- Git & GitHub
- Firebase (autenticación opcional)

---

## 📂 Estructura del Proyecto

```
/frontend
  └── Next.js Web App

/backend
  └── API REST (FastAPI / Django)

/ai
  └── Modelos y scripts de análisis

/workflows
  └── Automatizaciones n8n

/docs
  └── Documentación técnica
```

---

## 🚀 Instalación y Ejecución

### Requisitos
- Node.js
- Python 3.10+
- PostgreSQL
- Docker (opcional)

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📈 Alcance del Proyecto

- Conciliación de un banco y un sistema interno.
- Procesamiento de archivos estructurados.
- Modelos de IA aplicados a datos reales.
- Escalable para futuras integraciones.

---

## 👨‍💻 Equipo de Desarrollo

- Nombre del Estudiante 1 – Ingeniería en Informática
- Nombre del Estudiante 2 – Ingeniería en Informática

---

## 🎓 Contexto Académico

Este proyecto fue desarrollado como parte del **Proyecto Modular de Titulación** para la obtención del título de **Ingeniero en Informática**, cumpliendo con los criterios académicos de:

- Programación
- Bases de Datos
- Análisis de Datos
- Inteligencia Artificial
- Desarrollo Web

---

## 📄 Licencia

Este proyecto se distribuye bajo licencia MIT.
