
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
              }else if (typeof ev == "Array"){
                console.log('Array Event received')
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
              },

              {
                object: 'GameApplication',
                function: 'Player1Message',
                type: String
              },
              {
                object: 'GameApplication',
                function: 'Player2Message',
                type: String
              },
              {
                object: 'GameApplication',
                function: 'Player3Message',
                type: String
              },
              {
                object: 'GameApplication',
                function: 'Player4Message',
                type: String
              },

              {
                object: 'GameApplication',
                function: 'ReceiveMessage',
                type: String
              },
              {
                object: 'GameApplication',
                function: 'SetHost',
                type: Number
              },

              // {
              //   object: 'GameApplication',
              //   function: 'UpdateState',
              //   type: 'array'
              // },
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
        // Player inputs
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

        // message sources
        {
          source: 'Router:message0',
          target: 'unity:Player1Message'
        },
        {
          source: 'Router:message1',
          target: 'unity:Player2Message'
        },
        {
          source: 'Router:message2',
          target: 'unity:Player3Message'
        },
        {
          source: 'Router:message3',
          target: 'unity:Player4Message'
        },

        {
          source: 'unity:unityEvent',
          target: 'Router:message0'
        },
        {
          source: 'unity:unityEvent',
          target: 'Router:message1'
        },
        {
          source: 'unity:unityEvent',
          target: 'Router:message2'
        },
        {
          source: 'unity:unityEvent',
          target: 'Router:message3'
        },


        {
          source: 'Router:message',
          target: 'unity:ReceiveMessage'
        },
        {
          source: 'unity:unityEvent',
          target: 'Router:message'
        },

        // {
        //   source: 'Router:designateHost',
        //   target: 'unity:SetHost'
        // },

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