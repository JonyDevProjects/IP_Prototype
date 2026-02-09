
import type { BlockDefinition } from '../types';
import { TimelineComponent } from './TimelineView';
import { TimelineProperties } from './TimelineProperties';

export const TimelineBlockDefinition: BlockDefinition = {
    type: 'timeline',
    label: 'Timeline',
    icon: 'view_timeline',
    createBlock: (id) => ({
        id,
        type: 'timeline', // Fixed: Added missing type property
        content: [
            {
                title: 'Génesis y Valoración', summary: '¿De dónde surge la necesidad?', icon: 'lightbulb', theme: 'amber',
                detailTitle: 'Génesis y Valoración', detailSubtitle: '¿De dónde surge la necesidad?',
                detailIcon: 'lightbulb',
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
                title: 'Solución Conceptual', summary: '¿Cómo lo vamos a resolver?', icon: 'settings', theme: 'blue',
                detailTitle: 'Solución Conceptual', detailSubtitle: '¿Cómo lo vamos a resolver?',
                detailIcon: 'settings',
                cards: [
                    { title: 'Análisis de Alternativas', text: '¿Comprar software (COTS)? ¿Desarrollo a medida? ¿Adaptar sistema actual? ¿Externalizar?', icon: 'check_circle' },
                    { title: 'Criterios', text: 'Decidir basándose en Tiempo, Coste, Riesgo y Conocimiento del equipo.', icon: 'check_circle' }
                ],
                images: [
                    'https://assets.aceternity.com/templates/startup-3.webp'
                ]
            },
            {
                title: 'Estudio de Negocio', summary: 'Justificando la inversión (Business Case)', icon: 'description', theme: 'indigo',
                detailTitle: 'Estudio de Negocio', detailSubtitle: 'Justificando la inversión (Business Case)',
                detailIcon: 'description',
                cards: [
                    { title: 'Propósito', text: 'Convencer a la Alta Dirección para aprobar el presupuesto.', icon: 'check_circle' },
                    { title: 'Componentes', text: 'Visión estratégica, análisis financiero (ROI/VAN), análisis competitivo y riesgos iniciales.', icon: 'check_circle' }
                ],
                images: [
                    'https://assets.aceternity.com/templates/startup-4.webp'
                ]
            },
            {
                title: 'Alcance Preliminar', summary: 'Dibujando la cancha', icon: 'track_changes', theme: 'red',
                detailTitle: 'Alcance Preliminar', detailSubtitle: 'Dibujando la cancha',
                detailIcon: 'track_changes',
                cards: [
                    { title: 'Límites', text: 'Definir claramente qué está DENTRO y qué está FUERA del proyecto.', icon: 'check_circle' },
                    { title: 'Datos Clave', text: 'Criterios de aceptación, EDT inicial (WBS), Hitos principales y Costes ROM (Orden de Magnitud).', icon: 'check_circle' }
                ],
                images: []
            },
            {
                title: 'Interesados (Stakeholders)', summary: '¿A quién afecta?', icon: 'groups', theme: 'green',
                detailTitle: 'Interesados (Stakeholders)', detailSubtitle: '¿A quién afecta?',
                detailIcon: 'groups',
                cards: [
                    { title: 'Mapeo', text: 'Identificar a todos los actores relevantes desde el inicio.', icon: 'check_circle' },
                    { title: 'Preguntas', text: '¿Quién recibe el beneficio? ¿Quién provee los datos? ¿Quién lo supervisa? ¿Quién sufre las repercusiones?', icon: 'check_circle' }
                ],
                images: []
            },
            {
                title: 'Lanzamiento (Project Charter)', summary: 'Luz verde oficial', icon: 'rocket_launch', theme: 'purple',
                detailTitle: 'Lanzamiento (Project Charter)', detailSubtitle: 'Luz verde oficial',
                detailIcon: 'rocket_launch',
                cards: [
                    { title: 'Oficialización', text: 'Firma del Acta de Constitución (Project Charter).', icon: 'check_circle' },
                    { title: 'Equipo', text: 'Nombrar al Project Manager (PM) y formar el equipo núcleo.', icon: 'check_circle' },
                    { title: 'Kick-off', text: 'Reunión de lanzamiento para alinear expectativas.', icon: 'check_circle' }
                ],
                images: [
                    'https://assets.aceternity.com/templates/startup-1.webp'
                ]
            }
        ],
        metadata: { activeStepIndex: 0 }
    }),
    Component: TimelineComponent,
    Properties: TimelineProperties
};
