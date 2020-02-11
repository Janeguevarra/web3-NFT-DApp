import { getSearch } from 'connected-react-router'
import { createSelector } from 'reselect'
import { UIState } from '../ui/reducer'
import { NFTState } from '../nft/reducer'
import { FETCH_NFTS_REQUEST } from '../nft/actions'
import { NFT } from '../nft/types'
import {
  getData as getNFTData,
  getLoading as getNFTLoading
} from '../nft/selectors'
import { SortBy, Section } from '../routing/search'
import { RootState } from '../reducer'
import { View } from './types'

export const getState = (state: RootState) => state.ui
export const getNFTs = createSelector<
  RootState,
  UIState,
  NFTState['data'],
  NFT[]
>(getState, getNFTData, (ui, nftsById) => ui.nftIds.map(id => nftsById[id]))

export const getUIPage = createSelector<RootState, string, number>(
  getSearch,
  search => {
    const page = new URLSearchParams(search).get('page')
    return page === null || isNaN(+page) ? 1 : +page
  }
)

export const getUISection = createSelector<RootState, string, Section>(
  getSearch,
  search => {
    const section = new URLSearchParams(search).get('section')
    if (section && Object.values(Section).includes(section as any)) {
      return section as Section
    }
    return Section.ALL
  }
)

export const getUISortBy = createSelector<RootState, string, SortBy>(
  getSearch,
  search => {
    const sortBy = new URLSearchParams(search).get('sortBy')
    if (sortBy) {
      return sortBy as SortBy
    }
    return SortBy.RECENTLY_LISTED
  }
)

export const getUIOnlyOnSale = createSelector<
  RootState,
  string,
  boolean | null
>(getSearch, search => {
  const onlyOnSale = new URLSearchParams(search).get('onlyOnSale')
  return onlyOnSale === null ? onlyOnSale : onlyOnSale === 'true'
})

export const getHomepageWearables = createSelector<
  RootState,
  UIState,
  NFTState['data'],
  NFT[]
>(getState, getNFTData, (ui, nftsById) =>
  ui.homepageWearableIds.map(id => nftsById[id])
)

export const getHomepageLand = createSelector<
  RootState,
  UIState,
  NFTState['data'],
  NFT[]
>(getState, getNFTData, (ui, nftsById) =>
  ui.homepageLandIds.map(id => nftsById[id])
)

export const getHomepageENS = createSelector<
  RootState,
  UIState,
  NFTState['data'],
  NFT[]
>(getState, getNFTData, (ui, nftsById) =>
  ui.homepageENSIds.map(id => nftsById[id])
)

export const isHomepageWearablesLoading = (state: RootState) =>
  getNFTLoading(state).some(
    action =>
      action.type === FETCH_NFTS_REQUEST &&
      action.payload.options.view === View.HOME_WEARABLES
  )

export const isHomepageENSLoading = (state: RootState) =>
  getNFTLoading(state).some(
    action =>
      action.type === FETCH_NFTS_REQUEST &&
      action.payload.options.view === View.HOME_LAND
  )
export const isHomepageLandLoading = (state: RootState) =>
  getNFTLoading(state).some(
    action =>
      action.type === FETCH_NFTS_REQUEST &&
      action.payload.options.view === View.HOME_ENS
  )
