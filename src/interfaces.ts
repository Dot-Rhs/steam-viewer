export interface IGameInfo {
  id: number;
  name: string;
  description: string;
  languages: string;
  headerImg: string;
  website: string | null;
  screenshots?: {
    id: number;
    path_full: string;
    path_thumbnail: string;
  }[];
  releaseDate?: {
    coming_soon: boolean;
    date: string;
  };
  backgroundImg?: string;
  movies?: {
    id: number;
    name: string;
    thumbnail: string;
    webm: { "480": string; max: string };
    highlight: boolean;
  }[];
}

export interface IUserResponse {
  players: IPlayerInfo[];
  friends: IFriendsData[];
  ownedGames: IPlayerGames;
  recentlyPlayed: IRecentlyPlayed;
}

interface IGamePlaytime {
  appid: number;
  playtime_forever: number;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
}

export interface IOwnedGame extends IGamePlaytime {
  rtime_last_played: number;
  playtime_disconnect: number;
}

export interface IRecentGame extends IGamePlaytime {
  name: string;
  img_icon_url: string;
  playtime_2weeks: number;
}

export interface IPlayerGames {
  game_count: number;
  games: IOwnedGame[];
}

export interface IRecentlyPlayed {
  total_count: number;
  games: IRecentGame[];
}

export interface IUserData {
  player: IPlayerInfo;
  friendsList: IFriendsData[];
  gamesList: IPlayerGames;
  recentlyPlayed: IRecentlyPlayed;
}

export interface IFriendsData {
  friend_since: number;
  relationship: string;
  steamid: string | number;
}

export interface IPlayerInfo {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  realname?: string;
  primaryclanid?: string;
  timecreated?: number;
  personastateflags?: number;
  loccountrycode?: string;
}

export interface IGameDetailed {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: null;
  pc_requirements: Requirements;
  mac_requirements: Requirements;
  linux_requirements: Requirements;
  developers: string[];
  publishers: string[];
  price_overview: PriceOverview;
  packages: number[];
  package_groups: PackageGroup[];
  platforms: Platforms;
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  recommendations: Recommendations;
  release_date: ReleaseDate;
  support_info: SupportInfo;
  background: string;
  background_raw: string;
  content_descriptors: ContentDescriptors;
  ratings: null;
}

export interface Category {
  id: number;
  description: string;
}

export interface ContentDescriptors {
  ids: any[];
  notes: null;
}

export interface Genre {
  id: string;
  description: string;
}

export interface Requirements {
  minimum: string;
}

export interface PackageGroup {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: Sub[];
}

export interface Sub {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
}

export interface Platforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

export interface PriceOverview {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
  initial_formatted: string;
  final_formatted: string;
}

export interface Recommendations {
  total: number;
}

export interface ReleaseDate {
  coming_soon: boolean;
  date: string;
}

export interface Screenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

export interface SupportInfo {
  url: string;
  email: string;
}
