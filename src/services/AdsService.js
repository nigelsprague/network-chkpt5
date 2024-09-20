import { api } from "./AxiosService"
import { Ad } from "@/models/Ad"
import { AppState } from "@/AppState"

class AdsService{
  async getAds() {
    const res = await api.get('api/ads?count=7')
    const newAds = res.data.map(ad => new Ad(ad))
    AppState.ads = newAds
  }

}

export const adsService = new AdsService()