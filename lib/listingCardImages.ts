/**
 * Zdjęcia kart listy wyników (pl-002 … pl-050).
 * — pl-002 … pl-047: unikalne zdjęcia, dopasowane do typu tytułu (penthouse, willa, loft itd.).
 * — pl-048, pl-049, pl-050: to samo zdjęcie (jedna inwestycja / ten sam kompleks).
 *
 * Obrazy: lh3.googleusercontent.com (z projektu) + images.unsplash.com (uzupełnienie).
 */

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=82`;

/** Wspólne zdjęcie tylko dla trzech ostatnich ogłoszeń — nie występuje w `UNIQUE_CARD_IMAGES`. */
export const SHARED_TRIPLE_CARD_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBWM2WJ8PPWH6gZY7ngz8FCs6krUGmbmU79Rg0cFmP3TI6vlF8Tsza8lIciKSL6tPZQP9mVD--afdiNcF2QOJUBAp3xid6aCE5xKMb31JKvrIS1xbmPmOh8RY7gAn4T6fHvLa7_ig2JuhvPWdbZiVXh7hxOHxgohEohrRBqq4uGuSzRYhKCCRjx6JKmlsEBJBHdQaO30TxA-V-bfGL51ALf0lEcLvHJ5IeXryHc8QxWPA57PaP4SCx-2-VHEd_vtrrygYSSw1aWJ28";

/**
 * 46 unikalnych adresów — indeks 0 = pl-002, …, 45 = pl-047.
 * Układ: co 12 pozycji powtarza się typ tytułu (`TITLE_PREFIXES`); obrazy dobrane do typu (penthouse, kuchnia, willa, morze, loft…).
 */
const UNIQUE_CARD_IMAGES: readonly string[] = [
  // wiersz 1 — typy 0–11
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBRx8N7O1le6aLz88rBkytp-YRbk5sXfLkqf74Jh9MeFJ3fWvFGcF5AvYMIQVn7pnceNIi5i9jRLmfsu9NJoVsGNz7nOCFj-fBUfO3D1k5uHafbdq_i3Wt-jgLKdZibo4Vxd20QKo2Aa6cqjmAcWsyq5aNC7h1xBFLxxsQmM4q5zBd89E5cpyHEHExVKRhhUboxd7ysgHbo20HouioSBRpnpDC5jVa_mq-EzYvFFVTi_4Ba7AdNRIcG-Xf0tSRQYeojimasX1e9MXg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDill20nQ3GZV47n4daRmjQ3oA45cOPR7NP0RvJoS9BMx1n5NEMo96QDrOsX8DL0Ab7WbUPxgp4HxkF3ebh_zeaIZ7yufYW6QPh1oNMfAIlhrm0lZPODVKMVGvPbB--t0RJonKt1LoGwzrf6DmEiEyt7FPu9QzwyHYmWO8tj4nAuJq-mXJuMjrZuqOo4ZXg78WFci_yO9EHdPheWFHcoxL-3FYzMnOdlBjd7XoOCGGxYgq9t-ddz0BM7vX_jfeyCXR08REE9xpMgNw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuARb3s4yavqzA218EAlpdktE6_wkLzkNLpLIFFkyE5KBsT1MOPa8xar235uSWszea2oL0m7JAgZ2mY2EQvykgNroKgY71wCTlVw8Bp0NQC2Y2KIEiigu1ihgCBlAzSjghbN8vunaT037bvOeI8YGlqi-jxr-N9Q3tHn2PeoFBmVwFxRkcF3h5QnMt3acUelmqQoReVXZcceEi0Qj6ecELjW_VScTsiiVbY5_D153npEHisN7vARWZv6rUIIAyiFuf7OLd30m-vgLHk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCizgrNUPx3C8TvCjJs0q-ZOeeL3on0mOp_yaz22jnMq3TW48RK0iSFiBFkfh6eg5nlkfAqcN4afCRnRJiat_pu7FlZFgoqVQ4v1ge5MgA_E7oROSzJfoBWT5IZ-qsDzc7tGQdP_61BC_TOj2XqwInzclofgkqocOo0iz2B7aZ__8ntE1fE0CKLEQedDCiklNu3IYpqpF7ocrBC9flqLQMsEElM-kQvUFYjg01wJBCvyTuMDSeUgDpaYag9p1ixDGZwh1U-5zLWKr0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDrsPllQNlv3IBzY3CtMXKa1R1vJX5iW0TApqfIHiVh4i5rIYpLsKQdbbvhf1S-zO0qDSGUxryttaOGfkm-vJfCBqb41qdnj2zXPINTvMXSFu11FhzyM1iBiy59HOCksf6nGF1TY-yUlxL4Nv1qukviWQLO4JnmOia6kO72E1yLw5hes4mS6T6nGMFv-VKFKEWVkBiC9lFzmu4X7SC_MktsHkGain1rlScL_1oQF4P5YOAmsF256fE57aC65FjZ_VT54dM2NwA9cgo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDvY2N3RwAcGllgUUXY_6DkWq0XKPvYCMZrMmO9Utvntq46lIz8UOkH8lombf4Q7JXuc9f47YJHrNkrkOkyDGRA1QxgdvFNdMFBorzUHzfv2Ob2E0hjEKFWmWfuFl_zPhdoio5Owqim7KHvO9MpxQ1nKHwMMroUjp2TXFkCC79_40j0_mMuQzNOlDjS9lmejkndoKgbvu65YWoB4nV-GV2oi0KWua_WuL3sT7CyAP3YdjIlRI-Lmtcrebj4lHxNDSVhRYj61Zrbyt0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBTUWjQjqaQKV_CySRqLAt6aRZj7ZnHRrCAsFD9VAi8dTHNQALzqvI61050FrHT49maxqk9xphxKD0ZbTWdUAKvOzpQmFAjvLs-j-fVK1EmJnlee6VFymYlqfxSJLS5dB_7X0xU68q8uLEJz2PpYtHZxRwyXduThrZqUo7O-KTyBLgn26GA1Hr1QUiKl6UDqcWK-H_kCO_s1TkOENJW6lfldsiZorO3NnJRDa6FtpQ-pVGRBJh88fx7UDXXDLIALiNfgiaSOIjF2YM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBAc94QvH5KO_HOfXQwmhRkDAgcr97EdU1yYfEXOeVNNP616xlQZsppWLVYS1O_Y5L6yd5nP53ONLIqhI-k2jfn2MTVffp5TxS6rmivaEaPR_Px0Ww82qw2sxtG4nGX_YkEQeHGjMHYF4VtvB03wjnznHx-b9nzKc8LhOxhou8olEwppTmWqr72a5FCGe3s58f-u-4vtp01F1TPm1VR4jFBuhw77OnTWX8AARrE1HUz6rsCl1Bva9ge3m7-4NrgPN8VvcYk97wtBM4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDrgCcHY8FJ-8eoU6AlAGnQYCVwMhqnLg3LMqTtxHqqDNrqD6fPYAa9ZryLlk-SfV1oYXk60VLlB5bN2xZ8yv9TfNf0Llk2Pfdld-7s_NoU3W0iU3gaHm4_ttHyHVhDApKMZHpKtlsAGRUTDhc8qfA7AvengxHiKahW2AilnB7g99dFYvu2obXzprUhvcSc9GGa4uNu3uwZC3ZwkTb77OHHgj2OmyaQXScMJYedT5rTJ_7iwchPFdXpKzaGV-xK3QJO3es9VE8mXSs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBjTcG5Ctg1s2W5nnPRqgIg6ebeFPkxU4vcYVLYvwJB5Y0311QejGYRMvvoqy2jl0I7PvuulGKe4nFtr2DS6dbinodCO419CICrwLmB2-hv7WvjwnN-sNxyU7rlSsEm6Pn6ZqJlH7G1Hq3VOjm1wPSkd_NKXE8YLw1AgM0jG8Rnnxw5KRvaJnRBkCqdMWvvmy41FoB43YWn91BLUzv-daDC4WkoMzA8i5JZ3CSrj-9s0z-25nnK72F2UoXdQOP5sILEmUYe_GVqEeo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCH9KS8JL13s7C_JLODRRkTK0d9LeLJcwUSlMoKP4wDkbd1VUZ5TWKqNPN-iI3W20bcSYcmpB4WQry_T-U8ANkK7CPHrVCr8BPjWdM2Mrf26Gqt88EJYVISWFFnnIIsa72QF1SKMR23MzS8nL324g9jf_yaINwnd48d_ycycaOjDZD3t5hRL_txA8mOfwxI1T1r_fXO8YEKnHzgY-xahE54t82oYa9onAZkVtqvnq70x_jRvbK4rGnfpb8lsA33A_cIc6bfEQPkGNQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDCOrCE1eOqL2d7RiK4ruqD_COuzp86MaNXl8Ff11KnGXNqYw_OTk3jKbhmVXREjVCuzxs2t0wZF9PBxaqBHV-PAIPb_70RiL8GZYAjOyVSWAD00rNn4I0iqOsGCI8gM7IwAGA0LGOOzkcEyhtHJ58gxzT92LeVCDpReW1e4AB8MnHMM0K8ZwSPBC1811aQWL9qP7HIjEMqy0yFBxIipw0MZQNIPKDG7tuCNNU3uJK6X7ByP5ylfcH5iKMhDxtLPoqBja-vJx8Lboc",
  // wiersz 2
  U("photo-1512917774080-9991f1c4c750"),
  U("photo-1613490493576-7fde63acd811"),
  U("photo-1600566753190-17f0baa2a6c3"),
  U("photo-1600607687920-4e2a09cf159d"),
  U("photo-1605276374104-dee2a0ed3cd6"),
  U("photo-1600585154081-fe5aabe5ab9e"),
  U("photo-1600596542815-ffad4c1539a9"),
  U("photo-1600047509807-baaeb5c9d65e"),
  U("photo-1502672260266-1c1ef2d93688"),
  U("photo-1600585154083-f2755ac12c37"),
  U("photo-1600210492493-094691edb1e0"),
  U("photo-1600607688969-a5bfcd646154"),
  // wiersz 3
  U("photo-1600566752355-35792bed9ecd"),
  U("photo-1600585154340-be6161a56a0c"),
  U("photo-1600210492486-724fe5c67fb0"),
  U("photo-1600585154363-67eb9e2e2099"),
  U("photo-1600566753086-00f18fb6b3ea"),
  U("photo-1600607687939-ce8a6c25118c"),
  U("photo-1613977257363-043a6f8ab186"),
  U("photo-1564016718-7e396bc9df0c"),
  U("photo-1513584684374-8bab748fbf90"),
  U("photo-1522708323590-d24dbb6b0267"),
  U("photo-1484154218962-a197022b5858"),
  U("photo-1570129477492-45c003edd2be"),
  // wiersz 4 (tylko 10 typów — indeksy 36–45); osobne zdjęcia, bez powtórzeń z wierszy 2–3
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD8OVKGH11DJqLr4FGuQnBS0HRzYKOKVZ8LgdR8Z3hY2JqALRdV15rlO4KZhXvdTUB7bAWVMI86qjtmlsjrx5rVvov-T9uO5xyOSXFgexzryXUpofJ3MZSrOF9yRTuwqeLKP3rz3X05ReHpVPe66z2xaqCDwWy-R_2R6U7yIHRlKiDvw4wDjZfz5QfVpHJnVMNi3IaDJbUk88DUjEaWhIlhtyVN0eBzZ4qBbl8u-3ebcFxWdI1l-LN_WKg7tdWdr_JRQIGXmDnQBbw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBNfhcZcQwAEwFAgupk2Ml51iScBcvN1A1KlbnHNpCXN0Wu3hAae0OGxguOmf3IBlWcbc5sq8m0hU5bwQD7YvfvvRiu1nFw7Jio3Mxc1E9EeZ7ZVmW6ncB0f6TSPmN-_jt9nPeTS6Pr1qYDkqOCZRvoYhWNFt-HozsevpRzS43ngB_vDYuGjgf44s9fOs_xQFjPl-mBooG8YiTIQjgfIAdX5HLueWoe-e4Ma0SMKHfpKy3qJjMBL4KMheKyHzoynU88XWKrvtRNXQE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCuxpPSx2igahIqCyr-eLYxV0YEBFFFORGuz2VW3T8kmR-t037zDmQnsLf-Zr1pG4buU8KlUEnMIXHyaFy5gLO5pXmlPNxT0cwbh9xflG3-Oz3CN1EBBXkGKGF23a-SAfJG8Z4UulVFkU4tjmXoWXq4BAn3s-CuG737C8Nw3cjJFOYy-jSf3xP_E9n2Y2ZDk476JCSNJASMNRsoS1dO-NOVZ9Bb3tn41huXqKb42zaRVpKnOI_EBiFD77KFBFxuU_BhDAtyIGCoKs8",
  U("photo-1600585154526-990dced4db0d"),
  U("photo-1600571326480-694ebf9ec7a0"),
  U("photo-1600607688989-95c4b76e0e9b"),
  U("photo-1560518883-ce09059eeffa"),
  U("photo-1600210491366-8de7176a0f3c"),
  U("photo-1600607687644-c7171b5c7cd0"),
  U("photo-1560448204-e02f11c3d0e2"),
];

/** Obraz miniatury dla i-tego generowanego wpisu (i = 0 … 48 → pl-002 … pl-050). */
export function cardImageForGeneratedListing(zeroBasedIndex: number): string {
  if (zeroBasedIndex >= 46) return SHARED_TRIPLE_CARD_IMAGE;
  return UNIQUE_CARD_IMAGES[zeroBasedIndex]!;
}
