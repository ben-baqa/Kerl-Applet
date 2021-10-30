
// Link to Project Assets
import {config} from './buildconfig.js'
import {Unity} from './Unity.js'
import {Router} from './Router.js'

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
        {name:'eeg', class: "EEG"},
        {name:'neurofeedback', class: "Neurofeedback", params: {metric: 'Focus'}},
        {name:'command', class: "Event"},
        {name:'Brainstorm', class: "Brainstorm", params: {

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
          class: "DOM"
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
        },
        {
          source: 'unity:element',
          target: 'ui:content',
        }
      ]
    },
    intro: {
      title: false,
      mode: 'multi',
      login: false
    },
    version: "0.0.38",
    connect: true
}