import { SoftwareType } from "./const";

export const ResolveApp = async (url) => {
    let nURL = new URL(url);
    const nodeinfo_url = `${nURL.protocol}//${nURL.hostname}/nodeinfo/2.0`

    const ins_res = await fetch(nodeinfo_url)
    const ins_res_json = await ins_res.json()

    const soft_data = ins_res_json['software']
    return ResolveSoftwareType(soft_data['name'])
}

export const ResolveSoftwareType = (itype) => {
    switch (itype) {
        case "misskey":
        case "cherrypick":
        case "firefish":
            return SoftwareType.MISSKEY

        case "mastodon":
        case "fedibird":
            return SoftwareType.MASTODON
    }
}

export const ShuffleArray = (input) =>  {
    let arr = new Array()
    input.forEach(v => arr.push(v))

   for(let i = 0; i < arr.length; i++) {
        const randIdx = Math.floor(Math.random() * (arr.length + 1))

        const temp = arr[i]
        arr[i] = arr[randIdx]
        arr[randIdx] = temp
   } 
   console.log(arr)

   return arr
}

export const RemoveDuplication = (first, second) => {
    let filtered = second.filter((val) => first.indexOf(val) < 0)
    let concated = Array.prototype.concat(first, filtered)

    return concated
}

export const GenPollID = () => {
    let rnd_int = new Uint32Array(1)
    crypto.getRandomValues(rnd_int)

    const current_time = Date.now()
    const random_noize = Math.abs(current_time ^ rnd_int[0])

    return (current_time.toString(36)) + (random_noize.toString())
}