export type SidebarKey = "overview" | "performance" | "messages" | "settings";

export type ListingTab = "active" | "archived";

export type AgentListing = {
  id: string;
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  featured?: boolean;
  boostStyle: "mint" | "neutral";
};

export const AGENT_PROFILE = {
  name: "Alexander Thorne",
  title: "Senior Broker",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCecpQfC-YhUFMzH0s4qAXTGvpYiCWFYOMQeOPnhoqQ4fGaaCmsjf60tX7RD_uRtwoaazCUDJDLKEYq0-i8bnmOD_eEMmQisFllCoV9moLbzsMNytSMwK8WOUISuCE4YVDM_rmxpGhrJ7W9cm0sFa6JRrXRqh1-3K_iRsAL-DBp7UAN980EyflFvhPXFMa8nw3sZrai5r2b8_48cFGtndg4eQ3iqfYICP9H1KeeHPZZyTIq9Q0RZP6tZKtDZlj-UoxYY1sxofqR-UQ",
  navAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDmuiGbmnhoSg_YdysoV_J3vnBzoc_k4r7SwyOhfr9ZUraugClV-FqMx9Khy9O5-DDgfLgsWZxsRJzLzDjN5jvwdNCL1TvyjEWdelrg2OijQqpZ05WwCnVeTzrghYOoRuFIw0Exzk34VmF6BKzrClYvr0GmNPAvHjHEVcljoOaq1o1EfKV_EyzZhWi9BwfuJblJOjOIbU_1sy5l7nsGFWkd5Wa_HZGQWGNaPeIumJgFQEqkBE36RWD6VF40slmkh_Eumlpis_hz-IE",
};

export const KPI_STATS = [
  {
    label: "Total Views",
    value: "12,842",
    delta: "+12%",
    variant: "positive" as const,
  },
  {
    label: "Active Leads",
    value: "48",
    delta: "+5%",
    variant: "positive" as const,
  },
  {
    label: "Avg. Time to Close",
    value: "18d",
    delta: "-2d",
    variant: "negative" as const,
  },
];

export const LISTING_COUNTS = { active: 20, archived: 10 };

export const ACTIVE_LISTINGS: AgentListing[] = [
  {
    id: "1",
    title: "Modernist Glass Pavilion",
    address: "128 Architects Way, Beverly Hills",
    price: "$4,250,000",
    beds: 4,
    baths: 5,
    sqft: "4,500",
    featured: true,
    boostStyle: "mint",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWM2WJ8PPWH6gZY7ngz8FCs6krUGmbmU79Rg0cFmP3TI6vlF8Tsza8lIciKSL6tPZQP9mVD--afdiNcF2QOJUBAp3xid6aCE5xKMb31JKvrIS1xbmPmOh8RY7gAn4T6fHvLa7_ig2JuhvPWdbZiVXh7hxOHxgohEohrRBqq4uGuSzRYhKCCRjx6JKmlsEBJBHdQaO30TxA-V-bfGL51ALf0lEcLvHJ5IeXryHc8QxWPA57PaP4SCx-2-VHEd_vtrrygYSSw1aWJ28",
  },
  {
    id: "2",
    title: "Coastal Zen Retreat",
    address: "45 Ocean Breeze Dr, Malibu",
    price: "$2,800,000",
    beds: 3,
    baths: 3,
    sqft: "3,200",
    featured: false,
    boostStyle: "neutral",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTUWjQjqaQKV_CySRqLAt6aRZj7ZnHRrCAsFD9VAi8dTHNQALzqvI61050FrHT49maxqk9xphxKD0ZbTWdUAKvOzpQmFAjvLs-j-fVK1EmJnlee6VFymYlqfxSJLS5dB_7X0xU68q8uLEJz2PpYtHZxRwyXduThrZqUo7O-KTyBLgn26GA1Hr1QUiKl6UDqcWK-H_kCO_s1TkOENJW6lfldsiZorO3NnJRDa6FtpQ-pVGRBJh88fx7UDXXDLIALiNfgiaSOIjF2YM",
  },
];

export const ARCHIVED_LISTINGS: AgentListing[] = [
  {
    id: "a1",
    title: "Urban Loft Studio",
    address: "900 Figueroa St, Los Angeles",
    price: "$890,000",
    beds: 1,
    baths: 1,
    sqft: "980",
    featured: false,
    boostStyle: "neutral",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAc94QvH5KO_HOfXQwmhRkDAgcr97EdU1yYfEXOeVNNP616xlQZsppWLVYS1O_Y5L6yd5nP53ONLIqhI-k2jfn2MTVffp5TxS6rmivaEaPR_Px0Ww82qw2sxtG4nGX_YkEQeHGjMHYF4VtvB03wjnznHx-b9nzKc8LhOxhou8olEwppTmWqr72a5FCGe3s58f-u-4vtp01F1TPm1VR4jFBuhw77OnTWX8AARrE1HUz6rsCl1Bva9ge3m7-4NrgPN8VvcYk97wtBM4",
  },
];
