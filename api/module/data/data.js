import { BoostFromMastodon, FavouritesFromMastodon } from "./mastodon"
import { RenoteFromMisskey, ReactionFromMisskey } from "./misskey"

import { PollType } from "../const"
import { RemoveDuplication } from "../utils"

export const fetchFromMisskey = async (url, type) =>  {
   switch(type){
      case PollType.ONLY_RENOTE:
         return await RenoteFromMisskey(url)

      case PollType.ONLY_REACTION:
         return await ReactionFromMisskey(url)

      case PollType.BOTH:
         const Renote = await RenoteFromMisskey(url)
         const Reaction = await ReactionFromMisskey(url)

         return await RemoveDuplication(Renote, Reaction)

      default:
         return null
   }
}

export const fetchFromMastodon = async (url, type) => {
   switch(type){
      case PollType.ONLY_RENOTE:
         return await BoostFromMastodon(url)

      case PollType.ONLY_REACTION:
         return await FavouritesFromMastodon(url)

      case PollType.BOTH:
         const Renote = await BoostFromMastodon(url)
         const Reaction = await FavouritesFromMastodon(url)

         return RemoveDuplication(Renote, Reaction)

      default:
         return null
   }
}