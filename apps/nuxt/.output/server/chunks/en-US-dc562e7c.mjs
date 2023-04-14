const resource = {
  "a11y": {
    "loading_page": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Orrialdea kargatzen, itxaron"]);
    },
    "loading_titled_page": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " orria kargatzen, itxaron"]);
    },
    "locale_changed": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Hizkuntza ", _interpolate(_list(0)), "ra aldatu da"]);
    },
    "locale_changing": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hizkuntza aldatzen, itxaron"]);
    },
    "route_loaded": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " orrialdea kargatu da"]);
    }
  },
  "account": {
    "avatar_description": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), "(r)en abatarra"]);
    },
    "blocked_by": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erabiltzaile honek blokeatu zaitu."]);
    },
    "blocked_domains": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Blokeatutako domeinuak"]);
    },
    "blocked_users": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Blokeatutako erabiltzaileak"]);
    },
    "blocking": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Blokeatuta"]);
    },
    "bot": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["BOTa"]);
    },
    "favourites": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gogokoak"]);
    },
    "follow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jarraitu"]);
    },
    "follow_back": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jarraitu bera ere"]);
    },
    "follow_requested": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Eskaera bidalita"]);
    },
    "followers": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jarraitzaileak"]);
    },
    "followers_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list, plural: _plural } = ctx;
      return _plural([_normalize([_interpolate(_list(0)), " jarraitzaile"]), _normalize(["Jarraitzaile ", _interpolate(_list(0))]), _normalize([_interpolate(_list(0)), " jarraitzaile"])]);
    },
    "following": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jarraitzen"]);
    },
    "following_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " jarraitzen"]);
    },
    "follows_you": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jarraitzen dizu"]);
    },
    "go_to_profile": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Joan profilera"]);
    },
    "joined": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Batze-data:"]);
    },
    "moved_title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["adierazi du bere kontua aurrerantzean honakoa izango dela:"]);
    },
    "muted_users": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Mutututako erabiltzaileak"]);
    },
    "muting": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Mutututa"]);
    },
    "mutuals": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Komunean"]);
    },
    "notifications_on_post_disable": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize(["Utzi jakinarazpenak bidaltzeari ", _interpolate(_named("username")), "(r)ek argitaratzen duenean"]);
    },
    "notifications_on_post_enable": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize(["Jakinarazi ", _interpolate(_named("username")), "(r)ek argitaratzen duenean"]);
    },
    "pinned": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Finkatuta"]);
    },
    "posts": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bidalketak"]);
    },
    "posts_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list, plural: _plural } = ctx;
      return _plural([_normalize([_interpolate(_list(0)), " bidalketa"]), _normalize(["Bidalketa ", _interpolate(_list(0))]), _normalize([_interpolate(_list(0)), " bidalketa"])]);
    },
    "profile_description": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), "(r)en profilaren goiburua"]);
    },
    "profile_unavailable": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Profila ez dago eskuragai"]);
    },
    "request_follow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bidali jarraipen-eskaera"]);
    },
    "unblock": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Utzi blokeatzeari"]);
    },
    "unfollow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Utzi jarraitzeari"]);
    },
    "unmute": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Utzi mututzeari"]);
    },
    "view_other_followers": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Litekeena da beste instantziatako jarraitzaileak erakusgai ez egotea."]);
    },
    "view_other_following": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Litekeena da beste instantziatan jarraitzen direnak erakusgai ez egotea."]);
    }
  },
  "action": {
    "apply": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ezarri"]);
    },
    "bookmark": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jarri laster-marka"]);
    },
    "bookmarked": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Laster-marka jarrita"]);
    },
    "boost": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bultzatu"]);
    },
    "boost_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0))]);
    },
    "boosted": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bultzatuta"]);
    },
    "clear_publish_failed": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Garbitu argitalpen erroreak"]);
    },
    "clear_upload_failed": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Garbitu fitxategi-igoeren erroreak"]);
    },
    "close": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Itxi"]);
    },
    "compose": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Idatzi"]);
    },
    "confirm": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Baieztatu"]);
    },
    "edit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Editatu"]);
    },
    "enter_app": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Sartu aplikaziora"]);
    },
    "favourite": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Egin gogoko"]);
    },
    "favourite_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0))]);
    },
    "favourited": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gogoko eginda"]);
    },
    "more": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gehiago"]);
    },
    "next": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hurrengoa"]);
    },
    "prev": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Aurrekoa"]);
    },
    "publish": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Argitaratu"]);
    },
    "reply": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erantzun"]);
    },
    "reply_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0))]);
    },
    "reset": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Berrezarri"]);
    },
    "save": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gorde"]);
    },
    "save_changes": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gorde aldaketak"]);
    },
    "sign_in": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hasi saioa"]);
    },
    "sign_in_to": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Hasi saioa ", _interpolate(_list(0)), "(e)n"]);
    },
    "switch_account": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Aldatu kontua"]);
    },
    "vote": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Eman botoa"]);
    }
  },
  "app_desc_short": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Mastodon web-bezero arin bat"]);
  },
  "app_logo": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Elk Logo"]);
  },
  "app_name": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Elk"]);
  },
  "attachment": {
    "edit_title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Deskribapena"]);
    },
    "remove_label": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Kendu erantsitakoak"]);
    }
  },
  "command": {
    "activate": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Aktibatu"]);
    },
    "complete": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Osatu"]);
    },
    "compose_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Idatzi bidalketa berria"]);
    },
    "n-people-in-the-past-n-days": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " pertsona azken ", _interpolate(_list(1)), " egunetan"]);
    },
    "select_lang": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hautatu hizkuntza"]);
    },
    "sign_in_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gehitu dagoeneko existitzen den kontu bat"]);
    },
    "switch_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Aldatu ", _interpolate(_list(0)), "(e)ra"]);
    },
    "switch_account_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Aldatu beste kontu batera"]);
    },
    "toggle_dark_mode": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Modu iluna"]);
    },
    "toggle_zen_mode": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["ZEN modua"]);
    }
  },
  "common": {
    "end_of_list": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Zerrendaren amaiera"]);
    },
    "error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["ERROREA"]);
    },
    "fetching": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Eskuratzen\u2026"]);
    },
    "in": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\xB7"]);
    },
    "not_found": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["404 Ez da aurkitu"]);
    },
    "offline_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Lineaz kanpo zaudela dirudi. Egiaztatu konexioa."]);
    }
  },
  "compose": {
    "draft_title": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Zirriborroa ", _interpolate(_list(0))]);
    },
    "drafts": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize(["Zirriborroak (", _interpolate(_named("v")), ")"]);
    }
  },
  "confirm": {
    "block_account": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Utzi"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Blokeatu"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["Ziur ", _interpolate(_list(0)), " blokeatu nahi duzula?"]);
      }
    },
    "block_domain": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Utzi"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Blokeatu"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["Ziur ", _interpolate(_list(0)), " domeinua blokeatu nahi duzula?"]);
      }
    },
    "common": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ez"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Bai"]);
      }
    },
    "delete_list": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Utzi"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezabatu"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(['Ziur "', _interpolate(_list(0)), '" zerrenda ezabatu nahi duzula?']);
      }
    },
    "delete_posts": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Utzi"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezabatu"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ziur bidalketa hau ezabatu nahi duzula?"]);
      }
    },
    "mute_account": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Utzi"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Mututu"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["Ziur ", _interpolate(_list(0)), " mututu nahi duzula?"]);
      }
    },
    "show_reblogs": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Utzi"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Erakutsi"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["Ziur ", _interpolate(_list(0)), "(r)en bultzadak ikusi nahi dituzula?"]);
      }
    },
    "unfollow": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Utzi"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Utzi jarraitzeari"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ziur jarraitzeari utzi nahi diozula?"]);
      }
    }
  },
  "conversation": {
    "with": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["parte-hartzailea:"]);
    }
  },
  "custom_cards": {
    "stackblitz": {
      "lines": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize([_interpolate(_list(0)), " lerro"]);
      },
      "open": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ireki"]);
      },
      "snippet_from": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize([_interpolate(_list(0)), "(e)ko lagina"]);
      }
    }
  },
  "error": {
    "account_not_found": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " kontua ez da aurkitu"]);
    },
    "explore-list-empty": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ez dago joerarik une honetan. Zatoz geroago!"]);
    },
    "file_size_cannot_exceed_n_mb": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Fitxategien tamaina ezin da ", _interpolate(_list(0)), "MB baino handiagoa izan"]);
    },
    "sign_in_error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ezin izan da zerbitzarira konektatu."]);
    },
    "status_not_found": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ez da bidalketa aurkitu"]);
    },
    "unsupported_file_format": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Fitxategia ez da bateragarria"]);
    }
  },
  "help": {
    "build_preview": {
      "desc1": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["Komunitateak sortutako Elk-en aurreikuspen bat duzu aurrean - ", _interpolate(_list(0)), "."]);
      },
      "desc2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Litekeena da berrikusi ez diren aldaketak izatea, baita maltzurrak izan litezkeenak ere."]);
      },
      "desc3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ez hasi saioa zure benetako kontuarekin."]);
      },
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Preview deploy"]);
      }
    },
    "desc_highlight": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Oso litekeena da erroreak eta ezaugarriak faltan egotea aplikazioan zehar."]);
    },
    "desc_para1": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Eskerrik asko interesagatik eta Elk probatzeagatik, amaitu gabe dagoen Mastodonerako web-bezero arin bat!"]);
    },
    "desc_para2": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gogor ari gara garapen- eta hobetze-lanetan."]);
    },
    "desc_para3": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Garapenari bultzada emateko, GitHub Sponsors aukerari esker eman diezaiokezu babesa taldeari. Espero dugu Elk gogoko izatea!"]);
    },
    "desc_para4": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Elk kode irekikoa da. Laguntza eman nahi badiguzu probatzen, iritzia ematen edo kodea idazten,"]);
    },
    "desc_para5": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["jarri harremanetan GitHub bidez"]);
    },
    "desc_para6": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["eta hartu parte."]);
    },
    "footer_team": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Elk taldea"]);
    },
    "title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Elk-en aurreikuspena da hau!"]);
    }
  },
  "language": {
    "search": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bilatu"]);
    }
  },
  "list": {
    "add_account": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gehitu kontua zerrendara"]);
    },
    "cancel_edit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Utzi editatzeari"]);
    },
    "clear_error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Garbitu errorea"]);
    },
    "create": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Sortu"]);
    },
    "delete": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ezabatu zerrenda"]);
    },
    "delete_error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Errorea gertatu da zerrenda ezabatzerakoan"]);
    },
    "edit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Editatu zerrenda"]);
    },
    "edit_error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Errorea gertatu da zerrenda eguneratzerakoan"]);
    },
    "error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Errorea gertatu da zerrenda sortzerakoan"]);
    },
    "error_prefix": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Errorea: "]);
    },
    "list_title_placeholder": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Zerrendaren izena"]);
    },
    "modify_account": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Aldatu honako kontua duten zerrendak:"]);
    },
    "remove_account": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Kendu kontua zerrendatik"]);
    },
    "save": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gorde aldaketak"]);
    }
  },
  "menu": {
    "block_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Blokeatu ", _interpolate(_list(0))]);
    },
    "block_domain": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Blokeatu ", _interpolate(_list(0)), " domeinua"]);
    },
    "copy_link_to_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Kopiatu bidalketa honen esteka"]);
    },
    "copy_original_link_to_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Kopiatu bidalketa honen jatorrizko esteka"]);
    },
    "delete": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ezabatu"]);
    },
    "delete_and_redraft": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ezabatu eta berridatzi"]);
    },
    "direct_message_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Mezu zuzena ", _interpolate(_list(0))]);
    },
    "edit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Editatu"]);
    },
    "hide_reblogs": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Ezkutatu ", _interpolate(_list(0)), "(r)en bultzadak"]);
    },
    "mention_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Aipatu ", _interpolate(_list(0))]);
    },
    "mute_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Mututu ", _interpolate(_list(0))]);
    },
    "mute_conversation": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Mututu bidalketa"]);
    },
    "open_in_original_site": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ireki jatorrizko orrian"]);
    },
    "pin_on_profile": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Finkatu profilean"]);
    },
    "share_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Partekatu bidalketa"]);
    },
    "show_favourited_and_boosted_by": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erakutsi nork egin duen gogoko eta nork bultzatu duen"]);
    },
    "show_reblogs": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Erakutsi ", _interpolate(_list(0)), "(r)en bultzadak"]);
    },
    "show_untranslated": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erakutsi jatorrizko hizkuntzan"]);
    },
    "toggle_theme": {
      "dark": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Modu iluna"]);
      },
      "light": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Modu argia"]);
      }
    },
    "translate_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Egin itzulpena"]);
    },
    "unblock_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Utzi ", _interpolate(_list(0)), " blokeatzeari"]);
    },
    "unblock_domain": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Utzi ", _interpolate(_list(0)), " domeinua blokeatzeari"]);
    },
    "unmute_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Utzi ", _interpolate(_list(0)), " mututzeari"]);
    },
    "unmute_conversation": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Utzi bidalketa mututzeari"]);
    },
    "unpin_on_profile": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Utzi finkatzeari"]);
    }
  },
  "nav": {
    "back": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Joan atzera"]);
    },
    "blocked_domains": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Blokeatutako domeinuak"]);
    },
    "blocked_users": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Blokeatutako erabiltzaileak"]);
    },
    "bookmarks": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Laster-markak"]);
    },
    "built_at": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Biltze-data: ", _interpolate(_list(0))]);
    },
    "compose": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Idatzi"]);
    },
    "conversations": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Elkarrizketak"]);
    },
    "explore": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Esploratu"]);
    },
    "favourites": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gogokoak"]);
    },
    "federated": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Federatua"]);
    },
    "home": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hasiera"]);
    },
    "list": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Zerrenda"]);
    },
    "lists": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Zerrendak"]);
    },
    "local": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Lokala"]);
    },
    "muted_users": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Mutututako erabiltzaileak"]);
    },
    "notifications": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jakinarazpenak"]);
    },
    "privacy": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Pribatutasuna"]);
    },
    "profile": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Profila"]);
    },
    "search": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bilaketa"]);
    },
    "select_feature_flags": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Toggle Feature Flags"]);
    },
    "select_font_size": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Letra-tipoaren tamaina"]);
    },
    "select_language": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hizkuntza"]);
    },
    "settings": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ezarpenak"]);
    },
    "show_intro": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erakutsi aurkezpena"]);
    },
    "toggle_theme": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gai argia/iluna"]);
    },
    "zen_mode": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["ZEN modua"]);
    }
  },
  "notification": {
    "favourited_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["zure bidalketa gogoko egin du"]);
    },
    "followed_you": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["jarraitu dizu"]);
    },
    "followed_you_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list, plural: _plural } = ctx;
      return _plural([_normalize([_interpolate(_list(0)), " pertsonak jarraitu dizute"]), _normalize(["pertsona ", _interpolate(_list(0)), "ek jarraitu dizu"]), _normalize([_interpolate(_list(0)), " pertsonak jarraitu dizute"])]);
    },
    "missing_type": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["MISSING notification.type:"]);
    },
    "reblogged_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["zure bidalketari bultzada eman dio"]);
    },
    "request_to_follow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["jarraipen-eskaera bidali dizu"]);
    },
    "signed_up": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["izena eman du"]);
    },
    "update_status": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["bidalketa eguneratu du"]);
    }
  },
  "placeholder": {
    "content_warning": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Idatzi oharra hemen"]);
    },
    "default_1": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Zer duzu buruan?"]);
    },
    "reply_to_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Erantzun ", _interpolate(_list(0)), "(r)i"]);
    },
    "replying": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erantzuten"]);
    },
    "the_thread": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["haria"]);
    }
  },
  "pwa": {
    "dismiss": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Baztertu"]);
    },
    "install": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Instalatu"]);
    },
    "install_title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Instalatu Elk"]);
    },
    "title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Eguneraketa berria eskuragai!"]);
    },
    "update": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Eguneratu"]);
    },
    "update_available_short": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Eguneratu Elk"]);
    },
    "webmanifest": {
      "canary": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Mastodon web-bezero arin bat (canary)"]);
        },
        "name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Elk (canary)"]);
        },
        "short_name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Elk (canary)"]);
        }
      },
      "dev": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Mastodon web-bezero arin bat (dev)"]);
        },
        "name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Elk (dev)"]);
        },
        "short_name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Elk (dev)"]);
        }
      },
      "preview": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Mastodon web-bezero arin bat (preview)"]);
        },
        "name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Elk (preview)"]);
        },
        "short_name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Elk (preview)"]);
        }
      },
      "release": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Mastodon web-bezero arin bat"]);
        },
        "name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Elk"]);
        },
        "short_name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Elk"]);
        }
      }
    }
  },
  "search": {
    "search_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bilatu pertsonak eta traolak"]);
    },
    "search_empty": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ezin izan da ezer aurkitu"]);
    }
  },
  "settings": {
    "about": {
      "built_at": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Biltze-data"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Honi buruz"]);
      },
      "meet_the_team": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezagutu taldea"]);
      },
      "sponsor_action": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Eman babesa"]);
      },
      "sponsor_action_desc": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Elk garatzen duen taldeari babesa emateko"]);
      },
      "sponsors": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Babesleak"]);
      },
      "sponsors_body_1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Elk ondorengoen babes eskuzabalari eta laguntzari esker izan da posible egitea:"]);
      },
      "sponsors_body_2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Baita Elk taldea eta bere kideak babesten dituzten enpresa eta norbanakoei esker."]);
      },
      "sponsors_body_3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Aplikazioa gogoko baduzu, agian babesa eman diezagukezu:"]);
      },
      "version": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Bertsioa"]);
      }
    },
    "account_settings": {
      "description": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Editatu zure kontuaren ezarpenak Mastodonen interfazean"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Kontuaren ezarpenak"]);
      }
    },
    "interface": {
      "color_mode": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Kolorea"]);
      },
      "dark_mode": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Iluna"]);
      },
      "default": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize([" (defektuzkoa)"]);
      },
      "font_size": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Letra-tipoaren tamaina"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Interfazea"]);
      },
      "light_mode": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Argia"]);
      },
      "system_mode": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Sistemak darabilena"]);
      },
      "theme_color": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Gaiaren kolorea"]);
      }
    },
    "language": {
      "display_language": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Hizkuntza"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Hizkuntza"]);
      },
      "status": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["Itzulpenaren egoera: ", _interpolate(_list(0)), "/", _interpolate(_list(1)), " (", _interpolate(_list(2)), "%)"]);
      },
      "translations": {
        "add": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Gehitu"]);
        },
        "choose_language": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Hautatu hizkuntza"]);
        },
        "heading": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Itzulpenak"]);
        },
        "hide_specific": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Ezkutatu itzulpena ondorengo hizkuntzetarako:"]);
        },
        "remove": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Kendu"]);
        }
      }
    },
    "notifications": {
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Jakinarazpenak"]);
      },
      "notifications": {
        "label": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Jakinarazpenen ezarpenak"]);
        }
      },
      "push_notifications": {
        "alerts": {
          "favourite": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Gogokoak"]);
          },
          "follow": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Jarraitzaile berriak"]);
          },
          "mention": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Aipamenak"]);
          },
          "poll": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Bozketak"]);
          },
          "reblog": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Zure bidalketen bultzadak"]);
          },
          "title": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Zer jakinarazpen jaso nahi duzu?"]);
          }
        },
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Jaso jakinarazpenak Elk erabiltzen ari ez bazara ere."]);
        },
        "instructions": (ctx) => {
          const { normalize: _normalize, linked: _linked, type: _type } = ctx;
          return _normalize(["Ez ahaztu aldaketak gordetzeaz ", _linked("settings.notifications.push_notifications.save_settings", void 0, _type), " botoia erabiliz!"]);
        },
        "label": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Push jakinarazpenen ezarpenak"]);
        },
        "policy": {
          "all": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Edonorenak"]);
          },
          "followed": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Jarraitzen ditudan pertsonenak"]);
          },
          "follower": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Jarraitzen didaten pertsonenak"]);
          },
          "none": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Inorenak"]);
          },
          "title": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Noren jakinarazpenak jaso ditzazket?"]);
          }
        },
        "save_settings": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Gorde ezarpenak"]);
        },
        "subscription_error": {
          "clear_error": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Garbitu errorea"]);
          },
          "invalid_vapid_key": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Ez dirudi VAPID gako publikoa baliozkoa denik."]);
          },
          "permission_denied": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Baimena ukatu da: gaitu jakinarazpenak zure nabigatzailean."]);
          },
          "repo_link": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Elk-en biltegia GitHub-en"]);
          },
          "request_error": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Errorea gertatu da harpidetza eskatzerakoan, saiatu berriro eta errorea gertatuko balitz, jakinarazi Elk-en biltegian."]);
          },
          "title": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Ezin izan da push jakinarazpenei harpidetu"]);
          },
          "too_many_registrations": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Nabigatzailearen mugak direla-eta, Elk-ek ezin ditu push jakinarazpenak zerbitzari desberdinetan dauden kontuetarako erabili. Beste kontu bateko push harpidetza utzi eta saiatu berriro."]);
          },
          "vapid_not_supported": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Zure nabigatzailea webeko push jakinarazpenekin bateragarria da, baina ez dirudi VAPID protokoloa gauzatu duenik."]);
          }
        },
        "title": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Push jakinarazpenen ezarpenak"]);
        },
        "undo_settings": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Desegin aldaketak"]);
        },
        "unsubscribe": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Ezgaitu push jakinarazpenak"]);
        },
        "unsupported": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Zure nabigatzailea ez da push jakinarazpenekin bateragarria."]);
        },
        "warning": {
          "enable_close": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Itxi"]);
          },
          "enable_description": (ctx) => {
            const { normalize: _normalize, linked: _linked, type: _type } = ctx;
            return _normalize(['Elk irekita ez dagoenean jakinarazpenak jasotzeko, gaitu push jakinarazpenak. Zehatz mehatz kontrola dezakezu zer jakinarazpen mota jaso nahi duzun "', _linked("settings.notifications.show_btn", void 0, _type), '"', " botoiari esker aukera gaitu eta gero."]);
          },
          "enable_description_desktop": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(['Elk irekita ez dagoenean jakinarazpenak jasotzeko, gaitu push jakinarazpenak. Zehatz mehatz kontrola dezakezu zer jakinarazpen mota jaso nahi duzun "Settings > Notifications > Push notifications settings" eremuan aukera gaitu eta gero.']);
          },
          "enable_description_mobile": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(['Menuko nabigazioa ere erabil dezakezu ezarpenetara jotzeko: "Settings > Notifications > Push notification settings".']);
          },
          "enable_description_settings": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Elk irekita ez dagoenean jakinarazpenak jasotzeko, gaitu push jakinarazpenak. Zehatz mehatz kontrola dezakezu zer jakinarazpen mota jaso nahi duzun pantaila honetan bertan aukera gaitu eta gero."]);
          },
          "enable_desktop": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Gaitu push jakinarazpenak"]);
          },
          "enable_title": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Ez galdu ezer inoiz"]);
          },
          "re_auth": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["Ez dirudi zure zerbitzaria push jakinarazpenekin bateragarria denik. Saiatu saioa amaitzen eta berriro hasten; mezu honek badirau, jarri harremanetan zure zerbitzariko administratzailearekin."]);
          }
        }
      },
      "show_btn": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Joan jakinarazpenen ezarpenetara"]);
      },
      "under_construction": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Amaitzeke"]);
      }
    },
    "notifications_settings": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jakinarazpenak"]);
    },
    "preferences": {
      "enable_autoplay": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Gaitu erreproduzitze automatikoa"]);
      },
      "enable_data_saving": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Gaitu datu aurrezlea"]);
      },
      "enable_data_saving_description": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Aurreztu datuak eranskinen kargatze-automatikoa galarazten."]);
      },
      "enable_pinch_to_zoom": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Gaitu atximur keinua zoom egiteko"]);
      },
      "github_cards": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["GitHub Cards"]);
      },
      "grayscale_mode": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Gris modua"]);
      },
      "hide_account_hover_card": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezkutatu kontuaren geruza (Hide account hover card)"]);
      },
      "hide_alt_indi_on_posts": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezkutatu ALT adierazlea bidalketetan"]);
      },
      "hide_boost_count": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezkutatu bultzaden kopurua"]);
      },
      "hide_favorite_count": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezkutatu gogokoen kopurua"]);
      },
      "hide_follower_count": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezkutatu jarraitzaileen kopurua"]);
      },
      "hide_reply_count": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezkutatu erantzunen kopurua"]);
      },
      "hide_translation": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezkutatu itzulpenak"]);
      },
      "hide_username_emojis": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezkutatu emojiak erabiltzaile izenetan"]);
      },
      "hide_username_emojis_description": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Denbora-lerroetan erabiltzaile izenetako emojiak ezkutatzen ditu. Emojiak ikusgai egoten jarraituko dute euren profiletan."]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Hobespenak"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ezaugarri esperimentalak"]);
      },
      "user_picker": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Erabiltzaile hautatzailea"]);
      },
      "virtual_scroll": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Korritze birtuala"]);
      },
      "wellbeing": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ongizatea"]);
      }
    },
    "profile": {
      "appearance": {
        "bio": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Bio"]);
        },
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Editatu abatarra, erabiltzaile izena, profila, etab."]);
        },
        "display_name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Pantaila izena"]);
        },
        "label": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Itxura"]);
        },
        "profile_metadata": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Profileko metadatuak"]);
        },
        "profile_metadata_desc": (ctx) => {
          const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
          return _normalize(["Gehienez ", _interpolate(_list(0)), " item erakuts ditzakezu taula moduan profilean"]);
        },
        "profile_metadata_label": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Etiketa"]);
        },
        "profile_metadata_value": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Edukia"]);
        },
        "title": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Editatu profila"]);
        }
      },
      "featured_tags": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Jendeak traola hauek dituzten zure bidalketa publikoak ikus ditzazke."]);
        },
        "label": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Nabarmendutako traolak"]);
        }
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Profila"]);
      }
    },
    "select_a_settings": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hautatu ezarpena"]);
    },
    "users": {
      "export": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Esportatu erabiltzaile-tokenak"]);
      },
      "import": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Inportatu erabiltzaile-tokenak"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Saioa hasitako erabiltzaileak"]);
      }
    }
  },
  "share-target": {
    "description": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Elk beste aplikazioetako edukia partekatu ahal izateko konfiguratu daiteke; Elk zure gailuan instalatu eta saioa hasi behar duzu, besterik ez."]);
    },
    "hint": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Elk-ekin edukia partekatu nahi izatekotan, Elk instalatuta egon behar da eta saioa hasita."]);
    },
    "title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Partekatu Elk-ekin"]);
    }
  },
  "state": {
    "attachments_exceed_server_limit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erantsitakoen kopuruak bidalketaren muga gainditu du."]);
    },
    "attachments_limit_error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bidalketaren muga gainditu da"]);
    },
    "edited": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["(Editatua)"]);
    },
    "editing": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Editatzen"]);
    },
    "loading": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Kargatzen\u2026"]);
    },
    "publish_failed": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Argitaratzeak huts egin du"]);
    },
    "publishing": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Argitaratzen"]);
    },
    "upload_failed": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Igotzeak huts egin du"]);
    },
    "uploading": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Igotzen\u2026"]);
    }
  },
  "status": {
    "boosted_by": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bultzatu dute:"]);
    },
    "edited": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Azken edizioa: ", _interpolate(_list(0))]);
    },
    "favourited_by": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gogoko egin dute:"]);
    },
    "filter_hidden_phrase": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Iragazia:"]);
    },
    "filter_removed_phrase": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Iragazki honek kendu du:"]);
    },
    "filter_show_anyway": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erakutsi edonola ere"]);
    },
    "img_alt": {
      "ALT": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["ALT"]);
      },
      "desc": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Deskribapena"]);
      },
      "dismiss": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Baztertu"]);
      },
      "read": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["Irakurri ", _interpolate(_list(0)), " deskribapena"]);
      }
    },
    "poll": {
      "count": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list, plural: _plural } = ctx;
        return _plural([_normalize([_interpolate(_list(0)), " boto"]), _normalize(["boto ", _interpolate(_list(0))]), _normalize([_interpolate(_list(0)), " boto"])]);
      },
      "ends": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["epemuga: ", _interpolate(_list(0))]);
      },
      "finished": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["amaiera: ", _interpolate(_list(0))]);
      }
    },
    "reblogged": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), "(e)k bultzatua"]);
    },
    "replying_to": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), "(r)i erantzunez"]);
    },
    "show_full_thread": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erakutsi hari osoa"]);
    },
    "someone": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["norbait"]);
    },
    "spoiler_show_less": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erakutsi gutxiago"]);
    },
    "spoiler_show_more": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Erakutsi gehiago"]);
    },
    "thread": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Haria"]);
    },
    "try_original_site": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Probatu jatorrizko orrialdea"]);
    }
  },
  "status_history": {
    "created": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " sortua"]);
    },
    "edited": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " editatua"]);
    }
  },
  "tab": {
    "accounts": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Kontuak"]);
    },
    "for_you": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Zuretzat"]);
    },
    "hashtags": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Traolak"]);
    },
    "list": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Zerrendak"]);
    },
    "media": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Multimedia"]);
    },
    "news": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Albisteak"]);
    },
    "notifications_all": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Guztiak"]);
    },
    "notifications_mention": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Aipamenak"]);
    },
    "posts": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bidalketak"]);
    },
    "posts_with_replies": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bidalketak eta erantzunak"]);
    }
  },
  "tag": {
    "follow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jarraitu"]);
    },
    "follow_label": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Jarraitu ", _interpolate(_list(0)), " traola"]);
    },
    "unfollow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Utzi jarraitzeari"]);
    },
    "unfollow_label": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Utzi ", _interpolate(_list(0)), " traola jarraitzeari"]);
    }
  },
  "time_ago_options": {
    "day_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["0 egunetan"]), _normalize(["bihar"]), _normalize([_interpolate(_named("n")), " egunetan"])]);
    },
    "day_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["duela 0 egun"]), _normalize(["atzo"]), _normalize(["duela ", _interpolate(_named("n")), " egun"])]);
    },
    "hour_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["0 ordutan"]), _normalize(["ordu batean"]), _normalize([_interpolate(_named("n")), " ordutan"])]);
    },
    "hour_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["duela 0 ordu"]), _normalize(["duela ordubete"]), _normalize(["duela ", _interpolate(_named("n")), " ordu"])]);
    },
    "just_now": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["oraintxe bertan"]);
    },
    "minute_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["0 minututan"]), _normalize(["minutu batean"]), _normalize([_interpolate(_named("n")), " minututan"])]);
    },
    "minute_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["duela 0 minutu"]), _normalize(["duela minutu bat"]), _normalize(["duela ", _interpolate(_named("n")), " minutu"])]);
    },
    "month_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["0 hilabetetan"]), _normalize(["datorren hilabetean"]), _normalize([_interpolate(_named("n")), " hilabetetan"])]);
    },
    "month_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["duela 0 hilabete"]), _normalize(["aurreko hilabetean"]), _normalize(["duela ", _interpolate(_named("n")), " hilabete"])]);
    },
    "second_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["oraintxe bertan"]), _normalize(["datorren segunduan"]), _normalize(["datozen ", _interpolate(_named("n")), " segundutan"])]);
    },
    "second_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["oraintxe bertan"]), _normalize(["duela segundu ", _interpolate(_named("n"))]), _normalize(["duela ", _interpolate(_named("n")), " segundu"])]);
    },
    "short_day_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "e barru"]);
    },
    "short_day_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "e"]);
    },
    "short_hour_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "o barru"]);
    },
    "short_hour_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "o"]);
    },
    "short_minute_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "min barru"]);
    },
    "short_minute_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "min"]);
    },
    "short_month_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "h barru"]);
    },
    "short_month_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "h"]);
    },
    "short_second_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "s barru"]);
    },
    "short_second_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "s"]);
    },
    "short_week_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "a barru"]);
    },
    "short_week_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "a"]);
    },
    "short_year_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "u barru"]);
    },
    "short_year_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), "u"]);
    },
    "week_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["0 astetan"]), _normalize(["datorren astean"]), _normalize(["datozen ", _interpolate(_named("n")), " asteetan"])]);
    },
    "week_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["duela 0 aste"]), _normalize(["aurreko astean"]), _normalize(["duela ", _interpolate(_named("n")), " aste"])]);
    },
    "year_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["0 urtetan"]), _normalize(["datorren urtean"]), _normalize(["datozen ", _interpolate(_named("n")), " urteetan"])]);
    },
    "year_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["duela 0 urte"]), _normalize(["aurreko urtean"]), _normalize(["duela ", _interpolate(_named("n")), " urte"])]);
    }
  },
  "timeline": {
    "show_new_items": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["Erakutsi ", _interpolate(_named("v")), " elementu berri"]), _normalize(["Erakutsi elementu berri ", _interpolate(_named("v"))]), _normalize(["Erakutsi ", _interpolate(_named("v")), " elementu berri"])]);
    },
    "view_older_posts": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Oso litekeena da beste instantziatako bidalketa zaharragoak ikusgai ez egotea."]);
    }
  },
  "title": {
    "federated_timeline": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Denbora-lerro federatua"]);
    },
    "local_timeline": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Denbora-lerro lokala"]);
    }
  },
  "tooltip": {
    "add_content_warning": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gehitu edukiari buruzko oharra"]);
    },
    "add_emojis": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gehitu emojiak"]);
    },
    "add_media": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gehitu irudiak, bideoak edo audio fitxategi bat"]);
    },
    "add_publishable_content": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gehitu argitaratzeko edukia"]);
    },
    "change_content_visibility": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Aldatu edukiaren ikusgaitasuna"]);
    },
    "change_language": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Aldatu hizkuntza"]);
    },
    "emoji": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Emojia"]);
    },
    "explore_links_intro": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Albiste hauei buruz ari dira hitz egiten sare deszentralizatutako zerbitzari honetan eta beste batzuetan."]);
    },
    "explore_posts_intro": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bidalketa hauek bogan daude deszentralizatutako zerbitzari honetan eta beste batzuetan."]);
    },
    "explore_tags_intro": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Traola hauek joera dira deszentralizatutako zerbitzari honetan eta beste batzuetan."]);
    },
    "open_editor_tools": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Editatzeko tresnak"]);
    },
    "pick_an_icon": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hautatu ikonoa"]);
    },
    "publish_failed": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Itxi editorearen goikaldeko huts-egiteen mezuak bidalketa berrargitaratzeko"]);
    },
    "toggle_bold": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Lodia"]);
    },
    "toggle_code_block": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Kodea"]);
    },
    "toggle_italic": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Etzana"]);
    }
  },
  "user": {
    "add_existing": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Gehitu dagoeneko existitzen den kontu bat"]);
    },
    "server_address_label": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Mastodon zerbitzariaren helbidea"]);
    },
    "sign_in_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hasi saioa profil edo traolak jarraitzeko, eta bidalketak gogoko egiteko, partekatzeko, eta erantzuteko edo beste zerbitzari bateko kontuarekin elkarreragiteko."]);
    },
    "sign_in_notice_title": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), "(e)ko datu publikoak ikusten"]);
    },
    "sign_out_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Amaitu ", _interpolate(_list(0)), "(r)en saioa"]);
    },
    "single_instance_sign_in_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hasi saioa profil edo traolak jarraitzeko, eta bidalketak gogoko egiteko, partekatzeko, eta erantzuteko."]);
    },
    "tip_no_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["Oraindik Mastodon kontua ez badaukazu, ", _interpolate(_list(0)), "."]);
    },
    "tip_register_account": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["hautatu zerbitzaria eta eman izena"]);
    }
  },
  "visibility": {
    "direct": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Zuzena"]);
    },
    "direct_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Aipatutako erabiltzaileek bakarrik ikusiko dute"]);
    },
    "private": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jarraitzaileak bakarrik"]);
    },
    "private_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Jarraitzen dizutenek bakarrik ikusiko dute"]);
    },
    "public": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Publikoa"]);
    },
    "public_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Edonork ikusiko du"]);
    },
    "unlisted": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Zerrendatu gabea"]);
    },
    "unlisted_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Edonork ikusiko du, baina ez da bilaketetan agertuko"]);
    }
  }
};

export { resource as default };
//# sourceMappingURL=en-US-dc562e7c.mjs.map
