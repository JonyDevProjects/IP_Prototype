import type { Course } from '../../types/course';

export const tema2CourseData: Course = {
  id: 'ip-2526-t2',
  title: 'Tema 2: Planificación...',
  description: 'Ciclo integral de la planificación, desde el Project Charter hasta las Líneas Base.',
  author: {
    name: 'Ing. Proyectos',
    avatar: 'https://ui-avatars.com/api/?name=IP&background=7f13ec&color=fff',
    role: 'Senior PMO'
  },
  totalProgress: 0,
  modules: [
    {
      id: 'm1',
      order: 1,
      title: 'Propósito y Pre-Planifica...',
      description: 'Definición del trabajo y procesos previos necesarios.',
      units: [
        {
          id: 'u1-1',
          title: 'Propósito de la Planificación',
          durationMin: 10,
          isCompleted: false,
          blocks: [
            {
              id: 'b-intro-text1',
              type: 'text',
              content: 'La planificación no es un trámite burocrático, es la creación de la fuente de información básica necesaria para controlar el proyecto.'
            },
            {
              id: 'b-intro-text2',
              type: 'text',
              content: 'Su objetivo final es obtener la aprobación formal para guiar la ejecución.'
            },
            {
              id: 'b1',
              type: 'step',
              content: {
                title: 'Propósitos Principales',
                icon: 'format_list_bulleted',
                theme: 'amber',
                detailTitle: 'Propósitos Principales',
                detailSubtitle: 'Los 4 pilares fundamentales para el éxito del proyecto',
                cards: [
                  {
                    title: 'DEFINICIÓN DEL TRABAJO',
                    text: 'Asegurar que todo el alcance esté identificado(y solo el alcance necesario)',
                    icon: 'check_circle'
                  },
                  {
                    title: 'SECUENCIACIÓN LÓGICA',
                    text: 'Planificar actividades en un orden coherente para optimizar el flujo de trabajo',
                    icon: 'check_circle'
                  },
                  {
                    title: 'GESTIÓN ANTICIPADA',
                    text: 'Identificar riesgos potenciales antes de que se conviertan en problemas reales.',
                    icon: 'check_circle'
                  },
                  {
                    title: 'VIABILIDAD',
                    text: 'Crear un calendario realista y asegurar la disponibilidad de recursos en el momento justo.',
                    icon: 'check_circle'
                  },
                  {
                    title: 'COMPROMISO',
                    text: 'Obtener acuerdo con los interesados (stakeholders) para evitar conflictos futuros.',
                    icon: 'check_circle'
                  }
                ],
                footerTip: '',
                footerTipIcon: ''
              }
            },
            {
              id: 'b-timeline-main',
              type: 'timeline',
              content: [
                {
                  title: '01',
                  summary: '¿De dónde surge la necesidad?',
                  icon: 'lightbulb',
                  theme: 'amber',
                  detailTitle: 'Génesis y Valoración',
                  detailSubtitle: 'Generación de ideas y primer acercamiento',
                  cards: [
                    { title: 'Detonantes', text: 'Obsolescencia técnica, competencia, ideas de empleados u oportunidades de ahorro.', icon: 'check_circle' },
                    { title: 'Acción Clave', text: 'Valorar si la idea se alinea con la estrategia y si es financieramente viable.', icon: 'check_circle' }
                  ],
                  images: [
                    'https://assets.aceternity.com/templates/startup-1.webp',
                    'https://assets.aceternity.com/templates/startup-2.webp'
                  ]
                },
                {
                  title: '02',
                  summary: '¿Cómo lo vamos a resolver?',
                  icon: 'settings',
                  theme: 'blue',
                  detailTitle: 'Solución Conceptual',
                  detailSubtitle: 'Análisis de viabilidad y riesgos',
                  cards: [
                    { title: 'Análisis de Alternativas', text: '¿Comprar software (COTS)? ¿Desarrollo a medida? ¿Adaptar sistema actual? ¿Externalizar?', icon: 'check_circle' },
                    { title: 'Criterios', text: 'Decidir basándose en Tiempo, Coste, Riesgo y Conocimiento del equipo.', icon: 'check_circle' }
                  ],
                  images: [
                    'https://assets.aceternity.com/templates/startup-3.webp'
                  ]
                },
                {
                  title: '03',
                  summary: 'Justificando la inversión (Business Case)',
                  icon: 'description',
                  theme: 'indigo',
                  detailTitle: 'Estudio de Negocio',
                  detailSubtitle: 'Formalización de requisitos',
                  cards: [
                    { title: 'Propósito', text: 'Convencer a la Alta Dirección para aprobar el presupuesto.', icon: 'check_circle' },
                    { title: 'Componentes', text: 'Visión estratégica, análisis financiero (ROI/VAN), análisis competitivo y riesgos iniciales.', icon: 'check_circle' }
                  ],
                  images: [
                    'https://assets.aceternity.com/templates/startup-4.webp'
                  ]
                }
              ],
              metadata: { activeStepIndex: 0 }
            }
          ]
        },
        {
          id: 'u1-2',
          title: 'El Ciclo de Génesis',
          durationMin: 15,
          isCompleted: false,
          blocks: [
            {
              id: 'b3',
              type: 'text',
              content: 'Este ciclo transforma una necesidad en un proyecto autorizado.'
            },
            {
              id: 'b-gen-1',
              type: 'step',
              content: {
                title: 'Génesis y Valoración', summary: '¿De dónde surge la necesidad?', icon: 'lightbulb', theme: 'amber',
                detailTitle: 'Génesis y Valoración',
                detailSubtitle: 'Definición de arquitectura y tecnologías',
                cards: [
                  { title: 'Detonantes', text: 'Obsolescencia técnica, competencia, ideas de empleados u oportunidades de ahorro.', icon: 'check_circle' },
                  { title: 'Acción Clave', text: 'Valorar si la idea se alinea con la estrategia y si es financieramente viable.', icon: 'check_circle' }
                ],
                footerTip: '',
                footerTipIcon: ''
              }
            },
            {
              id: 'b-gen-2',
              type: 'step',
              content: {
                title: 'Solución Conceptual', summary: '¿Cómo lo vamos a resolver?', icon: 'settings', theme: 'blue',
                detailTitle: 'Solución Conceptual',
                detailSubtitle: 'Planificación de sprints y equipo',
                cards: [
                  { title: 'Análisis de Alternativas', text: '¿Comprar software (COTS)? ¿Desarrollo a medida? ¿Adaptar sistema actual? ¿Externalizar?', icon: 'check_circle' },
                  { title: 'Criterios', text: 'Decidir basándose en Tiempo, Coste, Riesgo y Conocimiento del equipo.', icon: 'check_circle' }
                ],
                footerTip: '',
                footerTipIcon: ''
              }
            },
            {
              id: 'b-gen-3',
              type: 'step',
              content: {
                title: 'Estudio de Negocio', summary: 'Justificando la inversión (Business Case)', icon: 'description', theme: 'indigo',
                detailTitle: 'Estudio de Negocio',
                detailSubtitle: 'Documentación técnica y funcional',
                cards: [
                  { title: 'Propósito', text: 'Convencer a la Alta Dirección para aprobar el presupuesto.', icon: 'check_circle' },
                  { title: 'Componentes', text: 'Visión estratégica, análisis financiero (ROI/VAN), análisis competitivo y riesgos iniciales.', icon: 'check_circle' }
                ],
                footerTip: '',
                footerTipIcon: ''
              }
            },
            {
              id: 'b-gen-4',
              type: 'step',
              content: {
                title: 'Alcance Preliminar', summary: 'Dibujando la cancha', icon: 'track_changes', theme: 'red',
                detailTitle: 'Alcance Preliminar',
                detailSubtitle: 'Métricas y KPIs del proyecto',
                cards: [
                  { title: 'Límites', text: 'Definir claramente qué está DENTRO y qué está FUERA del proyecto.', icon: 'check_circle' },
                  { title: 'Datos Clave', text: 'Criterios de aceptación, EDT inicial (WBS), Hitos principales y Costes ROM (Orden de Magnitud).', icon: 'check_circle' }
                ],
                footerTip: '',
                footerTipIcon: ''
              }
            },
            {
              id: 'b-gen-5',
              type: 'step',
              content: {
                title: 'Interesados (Stakeholders)', summary: '¿A quién afecta?', icon: 'groups', theme: 'green',
                detailTitle: 'Interesados (Stakeholders)',
                detailSubtitle: 'Roles y responsabilidades',
                cards: [
                  { title: 'Mapeo', text: 'Identificar a todos los actores relevantes desde el inicio.', icon: 'check_circle' },
                  { title: 'Preguntas', text: '¿Quién recibe el beneficio? ¿Quién provee los datos? ¿Quién lo supervisa? ¿Quién sufre las repercusiones?', icon: 'check_circle' }
                ],
                footerTip: '',
                footerTipIcon: ''
              }
            }
          ]
        },
        {
          id: 'u1-3',
          title: 'Lanzamiento (Constitución)',
          durationMin: 10,
          isCompleted: false,
          blocks: [
            {
              id: 'b-launch-1',
              type: 'step',
              content: {
                title: 'Lanzamiento (Project Charter)', summary: 'Luz verde oficial', icon: 'rocket_launch', theme: 'purple',
                detailTitle: 'Lanzamiento (Project Charter)',
                detailSubtitle: 'Estrategia de lanzamiento y go-to-market',
                cards: [
                  { title: 'Oficialización', text: 'Firma del Acta de Constitución (Project Charter).', icon: 'check_circle' },
                  { title: 'Equipo', text: 'Nombrar al Project Manager (PM) y formar el equipo núcleo.', icon: 'check_circle' },
                  { title: 'Kick-off', text: 'Reunión de lanzamiento para alinear expectativas.', icon: 'check_circle' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'm2',
      order: 2,
      title: 'Planificación Detallada',
      description: 'Decálogo de planes subsidiarios.',
      units: [
        {
          id: 'u2-1',
          title: 'Gestión del Alcance',
          durationMin: 15,
          blocks: []
        },
        {
          id: 'u2-2',
          title: 'Tiempo y Coste',
          durationMin: 15,
          blocks: []
        },
        {
          id: 'u2-3',
          title: 'Subsidiarios (RRHH, Riesgo...',
          durationMin: 20,
          blocks: []
        }
      ]
    },
    {
      id: 'm3',
      order: 3,
      title: 'El Plan Maestro y Líneas ...',
      description: 'Estructura final y referencias de control.',
      units: [
        {
          id: 'u3-1',
          title: 'Plan de Proyecto',
          durationMin: 15,
          isCompleted: false,
          blocks: []
        },
        {
          id: 'u3-2',
          title: 'Líneas Base',
          durationMin: 15,
          blocks: []
        }
      ]
    }
  ]
};