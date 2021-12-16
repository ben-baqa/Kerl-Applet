class Router{

    static id = String(Math.floor(Math.random()*1000000))

    constructor() {

        // UI Identifier
        this.props = {
            id: String(Math.floor(Math.random()*1000000)),
            userLimit: 4,
            userMap: new Map()
        }


        // Port Definition
        this.ports = {
            default: {
                input: {type: undefined},
                output: {type: null},
                onUpdate: (user) => {
                    let i = this.props.userMap.get(user.id)
                    if (i != null) this.update(i, user)
                    
                    // want to trigger the SetHost function in a unity instance
                    // with the value i == 0 (first player who has joined)
                    // [not working]
                    this.update('designateHost', {isHost: i == 0})
                    console.log(`Player ${i + 1} Joined`)
                },
            },
            designateHost: {
                input: {type: Boolean},
                output: {type: Boolean},
                onUpdate: (user) => {
                    console.log(`value: ${user.isHost}`)
                    return user
                }
            },
            message: {
                input: {type: String},
                output: {type: String},
                onUpdate: (user) => user
            }
        }

        for (let i = 0; i < this.props.userLimit; i++){
            this.ports[i] = {
                input: {type: undefined},
                output: {type: undefined},
                onUpdate: (user) => {return user}
            }
        }
    }

    init = () =>  {
    }

    deinit = () => {}

    _userAdded = (user) => {
        // console.log("Users: " + user.id)
        // this.ports.designateHost(this.props.userMap.size == 0)

        if (this.props.userMap.size < this.props.userLimit){
            this.props.userMap.set(user.id, this.props.userMap.size)
        }
    }

    _userRemoved = (user) => {
        this.props.userMap.delete(user.id)
    }
}
export {Router}