import { Account } from "@/models/Account"
import { api } from "./AxiosService"
import { AppState } from "@/AppState"


class ProfilesService {
  async getProfileById(profileId) {
    AppState.activeProfile = null
    const res = await api.get( `api/profiles/${profileId}`)
    const newProfile = new Account(res.data)
    AppState.activeProfile = newProfile
  }

  setActiveProfile(profile) {
    AppState.activeProfile = profile
  }
}

export const profilesService = new ProfilesService()