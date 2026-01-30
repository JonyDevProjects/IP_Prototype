import { Course } from '../../types/course';

export const tema2CourseData: Course = {
  id: 'ip-2526-t2',
  title: 'Tema 2: Planificación Inicial y Plan de Proyectos',
  description: 'Ciclo integral de la planificación, desde el Project Charter hasta las Líneas Base.',
  author: {
    name: 'Ing. Proyectos',
    avatar: 'https://ui-avatars.com/api/?name=IP&background=7f13ec&color=fff',
    role: 'Senior PMO'
  },
  totalProgress: 15,
  modules: [
    {
      id: 'm1',
      order: 1,
      title: 'Fundamentos de la Planificación',
      description: 'Propósito y conceptos clave antes de iniciar.',
      units: [
        {
          id: 'u1-1',
          title: 'Propósito de la Planificación',
          durationMin: 5,
          isCompleted: true,
          blocks: [
            {
              id: 'b1',
              type: 'text',
              content: 'La planificación no es un trámite burocrático; es la creación de la fuente de información básica necesaria para controlar el proyecto.'
            },
            {
              id: 'b2',
              type: 'alert',
              content: {
                type: 'info',
                title: 'Objetivo Final',
                text: 'Obtener la aprobación formal para guiar la ejecución.'
              }
            }
          ]
        },
        {
          id: 'u1-2',
          title: 'Procesos Previos (Pre-Planificación)',
          durationMin: 10,
          isCompleted: false,
          blocks: [
            {
              id: 'b3',
              type: 'timeline',
              content: [
                { step: 1, title: 'Génesis', desc: 'Idea inicial' },
                { step: 2, title: 'Viabilidad', desc: 'Análisis coste/beneficio' },
                { step: 3, title: 'Project Charter', desc: 'Autorización formal' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'm2',
      order: 2,
      title: 'El Plan Maestro',
      description: 'Estructura y líneas base.',
      units: [
        {
          id: 'u2-1',
          title: 'Líneas Base del Proyecto',
          durationMin: 15,
          isCompleted: false,
          isLocked: true,
          blocks: [
            { id: 'b4', type: 'text', content: 'Referencias inmutables para medir el desempeño.' }
          ]
        }
      ]
    }
  ]
};