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
              id: 'b1',
              type: 'timeline',
              content: [
                {
                  id: 'step1',
                  title: 'Propósitos Principales',
                  icon: 'format_list_bulleted',
                  theme: 'amber',
                  detailTitle: 'Propósitos Principales',
                  detailSubtitle: 'Type here...',
                  detailIcon: 'format_list_bulleted',
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
                      text: 'Identificar riesgos potenciales antes de que se convertan en problemas reales.',
                      icon: 'check_circle'
                    },
                    {
                      title: 'VIABILIDAD',
                      text: 'Crear un calendario realista y asegurar la disponibilidad de recursos an le momento usto.',
                      icon: 'check_circle'
                    },
                    {
                      title: 'COMPROMISO',
                      text: 'Obtener acuerdo con los interesados (skateholders) para evitar cinflictos futuros.',
                      icon: 'check_circle'
                    }
                  ]
                }
              ]
            },
            {
              id: 'b2',
              type: 'alert',
              content: {
                title: 'Objetivo Final',
                text: 'Su objetivo final es obtener la aprobación formal para guiar la ejecución.',
                icon: 'lightbulb'
              }
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
              content: '### 2.1. El Ciclo de Génesis\nEste ciclo transforma una necesidad en un proyecto autorizado.'
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
              id: 'b6',
              type: 'text',
              content: 'Incluye el **Kick-off**: reunión inicial de arranque con el equipo y los interesados clave.'
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