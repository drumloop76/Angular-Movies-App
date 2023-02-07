export const navMenuItems = [
  {
      label: 'Home',
      route: '/home',
      hasDropdown: false,
  },
  {
      label: 'About',
      route: '/about',
      hasDropdown: false,
  },
  {
      label: 'Categories',
      route: false,
      hasDropdown: true,
      submenuList: [
      {
          label: 'Movies',
          route: '/movies',
          hasDropdown: false,
      },
      {
          label: 'TV Shows',
          route: '/shows',
          hasDropdown: false,
      },
      ]
  },
  {
      label: 'Contact',
      route: '/contact',
      hasDropdown: false,
  },
]

export const navMediaItems = [
  {
    label: 'Facebook',
    route: "https://sr-rs.facebook.com/",
    iconName: 'facebook',
    iconPrefix: 'fab'
  },
  {
    label: 'Twitter',
    route: "https://twitter.com/?lang=sr",
    iconName: 'twitter',
    iconPrefix: 'fab'
  },
  {
    label: 'Instagram',
    route: "https://www.instagram.com/",
    iconName: 'instagram',
    iconPrefix: 'fab',
  },
  {
    label: 'YouTube',
    route: "https://www.youtube.com/",
    iconName: 'youtube-square',
    iconPrefix: 'fab'
  },
  {
    label: 'Google',
    route: "https://www.google.com/",
    iconName: 'google',
    iconPrefix: 'fab'
  }
]