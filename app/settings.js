
// Link to Project Assets
import {config} from './buildconfig.js'
import {Unity} from './Unity.js'
import {Router} from './Router/js'

export const settings = {
    name: "Kerl",
    devices: ["EEG", "HEG"],
    author: "Juris Zebneckis",
    description: "",
    categories: ["WIP"],
    instructions:"",

    // App Logic
    graph:
    {
      nodes: [
        {name:'eeg', class: brainsatplay.plugins.biosignals.EEG},
        {name:'neurofeedback', class: brainsatplay.plugins.algorithms.Neurofeedback, params: {metric: 'Focus'}},
        {name:'command', class: brainsatplay.plugins.controls.Event},
        {name:'Brainstorm', class: brainsatplay.plugins.networking.Brainstorm, params: {

          onUserConnected: (u) => {
            let parser = settings.graph.nodes.find(n => n.name === 'Router')
            parser.instance._userAdded(u)
          },
      
          onUserDisconnected: (u) => {
            let parser = settings.graph.nodes.find(n => n.name === 'Router')
            parser.instance._userRemoved(u)
          },

        }},
        {name:'Router', class: Router},
        {
          name:'unity', 
          class: Unity, 
          params:{
            config,
            onUnityEvent: (ev) => {
              // Parse Messages from Unity
              if (typeof ev === 'string'){
                console.log('MESSAGE: ' + ev)
              }
            },
            commands: 
            [
              {
                object: 'GameApplication',
                function: 'Player1Update',
                type: 'boolean'
              },

              {
                object: 'GameApplication',
                function: 'Player2Update',
                type: 'boolean'
              },

              {
                object: 'GameApplication',
                function: 'Player3Update',
                type: 'boolean'
              },

              {
                object: 'GameApplication',
                function: 'Player4Update',
                type: 'boolean'
              }
            ]
          }
        },
        {
          name:'ui', 
          class: brainsatplay.plugins.interfaces.UI
        }
    ],

      edges: [

        {
          source: 'command',
          target: 'Brainstorm',
        },
        
        {
          source: 'Brainstorm:command',
          target: 'Router',
        },
        
        // Routes
        {
          source: 'Router:0',
          target: 'unity:Player1Update',
        },
        {
          source: 'Router:1',
          target: 'unity:Player2Update',
        },
        {
          source: 'Router:2',
          target: 'unity:Player3Update',
        },
        {
          source: 'Router:3',
          target: 'unity:Player4Update',
        }
      ]
    },
    version: "0.0.36",
    connect: true
}