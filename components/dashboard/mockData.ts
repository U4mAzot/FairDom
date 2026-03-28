export type SidebarKey = "overview" | "performance" | "messages" | "settings";

export type ListingTab = "active" | "archived";

export type AgentListing = {
  id: string;
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  areaSqm: string;
  image: string;
  featured?: boolean;
  boostStyle: "mint" | "neutral";
};

export const AGENT_PROFILE = {
  name: "Julian Kowalski",
  title: "Starszy doradca ds. nieruchomości premium",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCecpQfC-YhUFMzH0s4qAXTGvpYiCWFYOMQeOPnhoqQ4fGaaCmsjf60tX7RD_uRtwoaazCUDJDLKEYq0-i8bnmOD_eEMmQisFllCoV9moLbzsMNytSMwK8WOUISuCE4YVDM_rmxpGhrJ7W9cm0sFa6JRrXRqh1-3K_iRsAL-DBp7UAN980EyflFvhPXFMa8nw3sZrai5r2b8_48cFGtndg4eQ3iqfYICP9H1KeeHPZZyTIq9Q0RZP6tZKtDZlj-UoxYY1sxofqR-UQ",
  navAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDmuiGbmnhoSg_YdysoV_J3vnBzoc_k4r7SwyOhfr9ZUraugClV-FqMx9Khy9O5-DDgfLgsWZxsRJzLzDjN5jvwdNCL1TvyjEWdelrg2OijQqpZ05WwCnVeTzrghYOoRuFIw0Exzk34VmF6BKzrClYvr0GmNPAvHjHEVcljoOaq1o1EfKV_EyzZhWi9BwfuJblJOjOIbU_1sy5l7nsGFWkd5Wa_HZGQWGNaPeIumJgFQEqkBE36RWD6VF40slmkh_Eumlpis_hz-IE",
};

export const KPI_STATS = [
  {
    label: "Wyświetlenia łącznie",
    value: "12 842",
    delta: "+12%",
    variant: "positive" as const,
  },
  {
    label: "Aktywne leady",
    value: "48",
    delta: "+5%",
    variant: "positive" as const,
  },
  {
    label: "Śr. czas do finalizacji",
    value: "18 dni",
    delta: "-2 dni",
    variant: "negative" as const,
  },
];

export const LISTING_COUNTS = { active: 20, archived: 10 };

export const ACTIVE_LISTINGS: AgentListing[] = [
  {
    id: "1",
    title: "Rezydencja Szklana — Mokotów",
    address: "ul. Puławska 428, Warszawa",
    price: "4 250 000 zł",
    beds: 4,
    baths: 5,
    areaSqm: "418",
    featured: true,
    boostStyle: "mint",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWM2WJ8PPWH6gZY7ngz8FCs6krUGmbmU79Rg0cFmP3TI6vlF8Tsza8lIciKSL6tPZQP9mVD--afdiNcF2QOJUBAp3xid6aCE5xKMb31JKvrIS1xbmPmOh8RY7gAn4T6fHvLa7_ig2JuhvPWdbZiVXh7hxOHxgohEohrRBqq4uGuSzRYhKCCRjx6JKmlsEBJBHdQaO30TxA-V-bfGL51ALf0lEcLvHJ5IeXryHc8QxWPA57PaP4SCx-2-VHEd_vtrrygYSSw1aWJ28",
  },
  {
    id: "2",
    title: "Willa Nadmorska — Orłowo",
    address: "ul. Nadmorska 12, Gdynia",
    price: "2 800 000 zł",
    beds: 3,
    baths: 3,
    areaSqm: "298",
    featured: false,
    boostStyle: "neutral",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTUWjQjqaQKV_CySRqLAt6aRZjZnHRrCAsFD9VAi8dTHNQALzqvI61050FrHT49maxqk9xphxKD0ZbTWdUAKvOzpQmFAjvLs-j-fVK1EmJnlee6VFymYlqfxSJLS5dB_7X0xU68q8uLEJz2PpYtHZxRwyXduThrZqUo7O-KTyBLgn26GA1Hr1QUiKl6UDqcWK-H_kCO_s1TkOENJW6lfldsiZorO3NnJRDa6FtpQ-pVGRBJh88fx7UDXXDLIALiNfgiaSOIjF2YM",
  },
];

export const ARCHIVED_LISTINGS: AgentListing[] = [
  {
    id: "a1",
    title: "Apartament loft — Stare Miasto",
    address: "ul. Piotrkowska 88, Łódź",
    price: "890 000 zł",
    beds: 1,
    baths: 1,
    areaSqm: "92",
    featured: false,
    boostStyle: "neutral",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAc94QvH5KO_HOfXQwmhRkDAgcr97EdU1yYfEXOeVNNP616xlQZsppWLVYS1O_Y5L6yd5nP53ONLIqhI-k2jfn2MTVffp5TxS6rmivaEaPR_Px0Ww82qw2sxtG4nGX_YkEQeHGjMHYF4VtvB03wjnznHx-b9nzKc8LhOxhou8olEwppTmWqr72a5FCGe3s58f-u-4vtp01F1TPm1VR4jFBuhw77OnTWX8AARrE1HUz6rsCl1Bva9ge3m7-4NrgPN8VvcYk97wtBM4",
  },
];
