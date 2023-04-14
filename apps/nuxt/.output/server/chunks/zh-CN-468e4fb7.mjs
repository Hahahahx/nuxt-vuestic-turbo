const resource = {
  "a11y": {
    "loading_page": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u52A0\u8F7D\u9875\u9762\u4E2D\uFF0C\u8BF7\u7A0D\u540E"]);
    },
    "loading_titled_page": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u52A0\u8F7D", _interpolate(_list(0)), "\u9875\u9762\u4E2D\uFF0C\u8BF7\u7A0D\u540E"]);
    },
    "locale_changed": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u8BED\u8A00\u5DF2\u66F4\u6539\u4E3A", _interpolate(_list(0))]);
    },
    "locale_changing": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u66F4\u6539\u8BED\u8A00\u4E2D\uFF0C\u8BF7\u7A0D\u540E"]);
    },
    "route_loaded": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u9875\u9762", _interpolate(_list(0)), "\u5DF2\u52A0\u8F7D"]);
    }
  },
  "account": {
    "avatar_description": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " \u7684\u5934\u50CF"]);
    },
    "blocked_by": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u60A8\u5DF2\u88AB\u6B64\u7528\u6237\u62C9\u9ED1"]);
    },
    "blocked_domains": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u62C9\u9ED1\u7684\u57DF\u540D"]);
    },
    "blocked_users": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u62C9\u9ED1\u7684\u7528\u6237"]);
    },
    "blocking": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u62C9\u9ED1"]);
    },
    "bot": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u673A\u5668\u4EBA"]);
    },
    "favourites": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u559C\u6B22\u7684\u5E16\u6587"]);
    },
    "follow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5173\u6CE8"]);
    },
    "follow_back": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u56DE\u5173"]);
    },
    "follow_requested": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u7533\u8BF7\u5173\u6CE8"]);
    },
    "followers": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5173\u6CE8\u8005"]);
    },
    "followers_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u88AB ", _interpolate(_list(0)), " \u4EBA\u5173\u6CE8"]);
    },
    "following": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6B63\u5728\u5173\u6CE8"]);
    },
    "following_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u6B63\u5728\u5173\u6CE8 ", _interpolate(_list(0)), " \u4EBA"]);
    },
    "follows_you": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u5173\u6CE8\u4F60"]);
    },
    "go_to_profile": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8F6C\u5230\u4E2A\u4EBA\u8D44\u6599"]);
    },
    "joined": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u52A0\u5165"]);
    },
    "moved_title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7684\u65B0\u8D26\u53F7\u662F\uFF1A"]);
    },
    "muted_users": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u5C4F\u853D\u7684\u7528\u6237"]);
    },
    "muting": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u5C4F\u853D"]);
    },
    "mutuals": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E92\u76F8\u5173\u6CE8"]);
    },
    "notifications_on_post_disable": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize(["\u5F53 ", _interpolate(_named("username")), " \u53D1\u5E03\u65F6\u505C\u6B62\u901A\u77E5\u6211"]);
    },
    "notifications_on_post_enable": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize(["\u5F53 ", _interpolate(_named("username")), " \u53D1\u5E03\u65F6\u901A\u77E5\u6211"]);
    },
    "pinned": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7F6E\u9876\u7684\u5E16\u6587"]);
    },
    "posts": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5E16\u6587"]);
    },
    "posts_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " \u6761\u5E16\u6587"]);
    },
    "profile_description": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " \u7684\u4E2A\u4EBA\u8D44\u6599\u5934\u56FE"]);
    },
    "profile_unavailable": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E2A\u4EBA\u8D44\u6599\u4E0D\u53EF\u89C1"]);
    },
    "request_follow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8BF7\u6C42\u5173\u6CE8"]);
    },
    "unblock": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53D6\u6D88\u62C9\u9ED1"]);
    },
    "unfollow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53D6\u6D88\u5173\u6CE8"]);
    },
    "unmute": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53D6\u6D88\u5C4F\u853D"]);
    },
    "view_other_followers": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5176\u4ED6\u7AD9\u70B9\u4E0A\u7684\u5173\u6CE8\u8005\u53EF\u80FD\u4E0D\u4F1A\u5728\u8FD9\u91CC\u663E\u793A\u3002"]);
    },
    "view_other_following": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5176\u4ED6\u7AD9\u70B9\u4E0A\u6B63\u5728\u5173\u6CE8\u7684\u4EBA\u53EF\u80FD\u4E0D\u4F1A\u5728\u8FD9\u91CC\u663E\u793A\u3002"]);
    }
  },
  "action": {
    "apply": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5E94\u7528"]);
    },
    "bookmark": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6536\u85CF"]);
    },
    "bookmarked": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u6536\u85CF"]);
    },
    "boost": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8F6C\u53D1"]);
    },
    "boost_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0))]);
    },
    "boosted": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u8F6C\u53D1"]);
    },
    "clear_publish_failed": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6E05\u9664\u53D1\u5E03\u5931\u8D25\u4FE1\u606F"]);
    },
    "clear_upload_failed": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6E05\u9664\u4E0A\u4F20\u5931\u8D25\u4FE1\u606F"]);
    },
    "close": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5173\u95ED"]);
    },
    "compose": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u64B0\u5199"]);
    },
    "confirm": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u786E\u8BA4"]);
    },
    "edit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7F16\u8F91"]);
    },
    "enter_app": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8FDB\u5165\u5E94\u7528"]);
    },
    "favourite": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u559C\u6B22"]);
    },
    "favourite_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0))]);
    },
    "favourited": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u559C\u6B22"]);
    },
    "more": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u66F4\u591A"]);
    },
    "next": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E0B\u4E00\u4E2A"]);
    },
    "prev": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E0A\u4E00\u4E2A"]);
    },
    "publish": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53D1\u5E03"]);
    },
    "reply": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u56DE\u590D"]);
    },
    "reply_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0))]);
    },
    "reset": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u91CD\u7F6E"]);
    },
    "save": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4FDD\u5B58"]);
    },
    "save_changes": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4FDD\u5B58\u66F4\u6539"]);
    },
    "sign_in": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u767B\u9E7F"]);
    },
    "sign_in_to": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u767B\u9E7F ", _interpolate(_list(0))]);
    },
    "switch_account": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5207\u6362\u5E10\u53F7"]);
    },
    "vote": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6295\u7968"]);
    }
  },
  "app_desc_short": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u4E00\u4E2A\u7075\u5DE7\u7684 Mastodon \u5BA2\u6237\u7AEF"]);
  },
  "app_logo": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u5E94\u7528\u56FE\u6807"]);
  },
  "app_name": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u9E7F\u9E23"]);
  },
  "attachment": {
    "edit_title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u63CF\u8FF0"]);
    },
    "remove_label": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u79FB\u9664\u9644\u4EF6"]);
    }
  },
  "command": {
    "activate": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6267\u884C"]);
    },
    "complete": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5B8C\u6210"]);
    },
    "compose_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5199\u4E00\u6761\u65B0\u5E16\u6587"]);
    },
    "n-people-in-the-past-n-days": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u8FC7\u53BB ", _interpolate(_list(1)), " \u5929\u4E2D ", _interpolate(_list(0)), " \u4EBA\u8BBF\u95EE"]);
    },
    "select_lang": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9009\u62E9\u8BED\u8A00"]);
    },
    "sign_in_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6DFB\u52A0\u73B0\u6709\u5E10\u6237"]);
    },
    "switch_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u5207\u6362\u5230 ", _interpolate(_list(0))]);
    },
    "switch_account_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5207\u6362\u5230\u53E6\u4E00\u4E2A\u5E10\u6237"]);
    },
    "toggle_dark_mode": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5207\u6362\u6DF1\u8272\u6A21\u5F0F"]);
    },
    "toggle_zen_mode": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5207\u6362\u7985\u6A21\u5F0F"]);
    }
  },
  "common": {
    "end_of_list": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5217\u8868\u5230\u5E95\u5566"]);
    },
    "error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9519\u8BEF"]);
    },
    "in": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5728"]);
    },
    "not_found": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u5185\u5BB9"]);
    },
    "offline_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u60A8\u76EE\u524D\u5DF2\u79BB\u7EBF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u3002"]);
    }
  },
  "compose": {
    "draft_title": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u8349\u7A3F ", _interpolate(_list(0))]);
    },
    "drafts": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize(["\u8349\u7A3F (", _interpolate(_named("v")), ")"]);
    }
  },
  "confirm": {
    "block_account": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u53D6\u6D88"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u62C9\u9ED1"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u4F60\u786E\u5B9A\u62C9\u9ED1 ", _interpolate(_list(0)), " \u5417\uFF1F"]);
      }
    },
    "block_domain": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u53D6\u6D88"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u62C9\u9ED1"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u4F60\u786E\u5B9A\u62C9\u9ED1\u57DF\u540D ", _interpolate(_list(0)), " \u5417\uFF1F"]);
      }
    },
    "common": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5426"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u662F"]);
      }
    },
    "delete_list": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u53D6\u6D88"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5220\u9664"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(['\u4F60\u786E\u5B9A\u8981\u5220\u9664 "', _interpolate(_list(0)), '" \u5217\u8868\u5417\uFF1F']);
      }
    },
    "delete_posts": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u53D6\u6D88"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5220\u9664"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u4F60\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u5E16\u6587\u5417\uFF1F"]);
      }
    },
    "mute_account": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u53D6\u6D88"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5C4F\u853D"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u4F60\u786E\u5B9A\u5C4F\u853D ", _interpolate(_list(0)), " \u5417\uFF1F"]);
      }
    },
    "show_reblogs": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u53D6\u6D88"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u663E\u793A"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u4F60\u786E\u5B9A\u8981\u663E\u793A\u6765\u81EA ", _interpolate(_list(0)), " \u7684\u8F6C\u53D1\u5417\uFF1F"]);
      }
    },
    "unfollow": {
      "cancel": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u53D6\u6D88"]);
      },
      "confirm": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u53D6\u6D88\u5173\u6CE8"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u4F60\u786E\u5B9A\u8981\u53D6\u6D88\u5173\u6CE8\u5417\uFF1F"]);
      }
    }
  },
  "conversation": {
    "with": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E0E"]);
    }
  },
  "custom_cards": {
    "stackblitz": {
      "lines": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u884C ", _interpolate(_list(0))]);
      },
      "open": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u6253\u5F00"]);
      },
      "snippet_from": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u6765\u81EA ", _interpolate(_list(0)), " \u7684\u7247\u6BB5"]);
      }
    }
  },
  "error": {
    "account_not_found": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u672A\u627E\u5230\u7528\u6237 ", _interpolate(_list(0))]);
    },
    "explore-list-empty": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u76EE\u524D\u6CA1\u6709\u70ED\u95E8\u8BDD\u9898\uFF0C\u7A0D\u540E\u518D\u6765\u770B\u770B\u5427\uFF01"]);
    },
    "file_size_cannot_exceed_n_mb": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 ", _interpolate(_list(0)), "MB"]);
    },
    "sign_in_error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u65E0\u6CD5\u8FDE\u63A5\u670D\u52A1\u5668"]);
    },
    "status_not_found": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u672A\u627E\u5230\u5E16\u6587"]);
    },
    "unsupported_file_format": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u683C\u5F0F"]);
    }
  },
  "help": {
    "build_preview": {
      "desc1": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u60A8\u5F53\u524D\u6B63\u5728\u67E5\u770B\u6765\u81EA\u793E\u533A\u7684\u9E7F\u9E23\u9884\u89C8\u7248 - ", _interpolate(_list(0)), "\u3002"]);
      },
      "desc2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u53EF\u80FD\u5305\u542B\u672A\u7ECF\u5BA1\u67E5\u751A\u81F3\u6076\u610F\u7684\u66F4\u6539\u3002"]);
      },
      "desc3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u8BF7\u4E0D\u8981\u4F7F\u7528\u771F\u5B9E\u8D26\u53F7\u767B\u5F55"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9884\u89C8\u90E8\u7F72"]);
      }
    },
    "desc_highlight": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53EF\u80FD\u4F1A\u5728\u67D0\u4E9B\u5730\u65B9\u51FA\u73B0\u4E00\u4E9B bug \u6216\u7F3A\u5931\u7684\u529F\u80FD\u3002"]);
    },
    "desc_para1": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u611F\u8C22\u4F60\u6709\u5174\u8DA3\u5C1D\u8BD5\u9E7F\u9E23\uFF0C\u4E00\u4E2A\u6211\u4EEC\u6B63\u5728\u79EF\u6781\u5F00\u53D1\u7684\u901A\u7528 Mastodon \u5BA2\u6237\u7AEF\u3002"]);
    },
    "desc_para2": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6211\u4EEC\u6B63\u5728\u52AA\u529B\u5F00\u53D1\u4E2D\uFF0C\u5E76\u968F\u7740\u65F6\u95F4\u7684\u63A8\u79FB\u4E0D\u65AD\u5B8C\u5584\u3002"]);
    },
    "desc_para3": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E3A\u4E86\u5E2E\u52A9\u4FC3\u8FDB\u5F00\u53D1\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u94FE\u63A5\u8D5E\u52A9\u6211\u4EEC\u7684\u56E2\u961F\u6210\u5458\u3002\u5E0C\u671B\u4F60\u559C\u6B22\u9E7F\u9E23\uFF01"]);
    },
    "desc_para4": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9E7F\u9E23\u662F\u5F00\u6E90\u7684\uFF0C\u5982\u679C\u4F60\u613F\u610F\u5E2E\u52A9\u6D4B\u8BD5\u3001\u63D0\u4F9B\u53CD\u9988\u6216\u4F5C\u51FA\u8D21\u732E\uFF0C"]);
    },
    "desc_para5": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5728 GitHub \u4E0A\u8054\u7CFB\u6211\u4EEC"]);
    },
    "desc_para6": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6765\u53C2\u4E0E\u5176\u4E2D\u3002"]);
    },
    "footer_team": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9E7F\u9E23\u5F00\u53D1\u56E2\u961F"]);
    },
    "title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9884\u89C8\u9E7F\u9E23\uFF01"]);
    }
  },
  "language": {
    "search": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u641C\u7D22"]);
    }
  },
  "list": {
    "add_account": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5411\u5217\u8868\u4E2D\u6DFB\u52A0\u7528\u6237"]);
    },
    "cancel_edit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53D6\u6D88\u7F16\u8F91"]);
    },
    "clear_error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6E05\u7A7A\u9519\u8BEF"]);
    },
    "create": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u521B\u5EFA"]);
    },
    "delete": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5220\u9664\u5217\u8868"]);
    },
    "delete_error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5220\u9664\u5217\u8868\u65F6\u51FA\u73B0\u4E86\u4E00\u4E2A\u9519\u8BEF"]);
    },
    "edit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7F16\u8F91\u5217\u8868"]);
    },
    "edit_error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u66F4\u65B0\u5217\u8868\u65F6\u51FA\u73B0\u4E86\u4E00\u4E2A\u9519\u8BEF"]);
    },
    "error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u521B\u5EFA\u5217\u8868\u65F6\u51FA\u73B0\u4E86\u4E00\u4E2A\u9519\u8BEF"]);
    },
    "error_prefix": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9519\u8BEF\uFF1A"]);
    },
    "list_title_placeholder": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5217\u8868\u6807\u9898"]);
    },
    "modify_account": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4FEE\u6539\u5217\u8868\u4E2D\u7684\u7528\u6237"]);
    },
    "remove_account": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u79FB\u9664\u5217\u8868\u4E2D\u7684\u7528\u6237"]);
    },
    "save": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4FDD\u5B58\u66F4\u6539"]);
    }
  },
  "menu": {
    "block_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u62C9\u9ED1 ", _interpolate(_list(0))]);
    },
    "block_domain": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u62C9\u9ED1\u57DF\u540D ", _interpolate(_list(0))]);
    },
    "copy_link_to_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u590D\u5236\u8FD9\u7BC7\u5E16\u6587\u7684\u94FE\u63A5"]);
    },
    "copy_original_link_to_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u590D\u5236\u8FD9\u7BC7\u8D34\u6587\u7684\u539F\u59CB\u94FE\u63A5"]);
    },
    "delete": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5220\u9664"]);
    },
    "delete_and_redraft": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5220\u9664\u5E76\u91CD\u65B0\u7F16\u8F91"]);
    },
    "direct_message_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u79C1\u4FE1 ", _interpolate(_list(0))]);
    },
    "edit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7F16\u8F91"]);
    },
    "hide_reblogs": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u9690\u85CF\u6765\u81EA ", _interpolate(_list(0)), " \u7684\u8F6C\u53D1"]);
    },
    "mention_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u63D0\u53CA ", _interpolate(_list(0))]);
    },
    "mute_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u5C4F\u853D ", _interpolate(_list(0))]);
    },
    "mute_conversation": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9759\u97F3\u8FD9\u6761\u5E16\u6587"]);
    },
    "open_in_original_site": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4ECE\u6E90\u7AD9\u6253\u5F00"]);
    },
    "pin_on_profile": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7F6E\u9876\u5728\u4E2A\u4EBA\u8D44\u6599\u4E0A"]);
    },
    "share_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5206\u4EAB\u8FD9\u6761\u5E16\u6587"]);
    },
    "show_favourited_and_boosted_by": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5C55\u793A\u8C01\u559C\u6B22\u548C\u8F6C\u53D1\u4E86"]);
    },
    "show_reblogs": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u663E\u793A\u6765\u81EA ", _interpolate(_list(0)), " \u7684\u8F6C\u53D1"]);
    },
    "show_untranslated": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u663E\u793A\u539F\u6587"]);
    },
    "toggle_theme": {
      "dark": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5207\u6362\u6DF1\u8272\u6A21\u5F0F"]);
      },
      "light": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5207\u6362\u6D45\u8272\u6A21\u5F0F"]);
      }
    },
    "translate_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7FFB\u8BD1\u5E16\u6587"]);
    },
    "unblock_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u89E3\u9664\u62C9\u9ED1 ", _interpolate(_list(0))]);
    },
    "unblock_domain": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u89E3\u9664\u62C9\u9ED1\u57DF\u540D ", _interpolate(_list(0))]);
    },
    "unmute_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u89E3\u9664\u5C4F\u853D ", _interpolate(_list(0))]);
    },
    "unmute_conversation": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53D6\u6D88\u9759\u97F3\u5E16\u5B50"]);
    },
    "unpin_on_profile": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53D6\u6D88\u7F6E\u9876"]);
    }
  },
  "nav": {
    "back": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u56DE\u9000"]);
    },
    "blocked_domains": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u62C9\u9ED1\u7684\u57DF\u540D"]);
    },
    "blocked_users": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u62C9\u9ED1\u7684\u7528\u6237"]);
    },
    "bookmarks": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E66\u7B7E"]);
    },
    "built_at": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u6784\u5EFA\u4E8E ", _interpolate(_list(0))]);
    },
    "compose": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u64B0\u5199"]);
    },
    "conversations": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u79C1\u4FE1"]);
    },
    "explore": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u63A2\u7D22"]);
    },
    "favourites": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u559C\u6B22"]);
    },
    "federated": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8DE8\u7AD9"]);
    },
    "home": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E3B\u9875"]);
    },
    "list": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5217\u8868"]);
    },
    "lists": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5217\u8868"]);
    },
    "local": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u672C\u5730"]);
    },
    "muted_users": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5DF2\u5C4F\u853D\u7684\u7528\u6237"]);
    },
    "notifications": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u901A\u77E5"]);
    },
    "privacy": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9690\u79C1\u534F\u8BAE"]);
    },
    "profile": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E2A\u4EBA\u8D44\u6599"]);
    },
    "search": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u641C\u7D22"]);
    },
    "select_feature_flags": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u529F\u80FD\u5F00\u5173"]);
    },
    "select_font_size": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5B57\u4F53\u5927\u5C0F"]);
    },
    "select_language": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9009\u62E9\u8BED\u8A00"]);
    },
    "settings": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8BBE\u7F6E"]);
    },
    "show_intro": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5E94\u7528\u4ECB\u7ECD"]);
    },
    "toggle_theme": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5207\u6362\u4E3B\u9898"]);
    },
    "zen_mode": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7985\u6A21\u5F0F"]);
    }
  },
  "notification": {
    "favourited_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u70B9\u8D5E\u4E86\u4F60\u7684\u5E16\u6587"]);
    },
    "followed_you": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5173\u6CE8\u4E86\u4F60"]);
    },
    "followed_you_count": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u4EBA\u5173\u6CE8\u4E86\u4F60"]);
    },
    "missing_type": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u672A\u77E5\u7684\u901A\u77E5\u7C7B\u578B\uFF1A"]);
    },
    "reblogged_post": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8F6C\u53D1\u4E86\u4F60\u7684\u5E16\u6587"]);
    },
    "request_to_follow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8BF7\u6C42\u5173\u6CE8\u4F60"]);
    },
    "signed_up": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6CE8\u518C\u4E86"]);
    },
    "update_status": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u66F4\u65B0\u4E86\u4ED6\u4EEC\u7684\u72B6\u6001"]);
    }
  },
  "placeholder": {
    "content_warning": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5199\u4E0B\u4F60\u7684\u8B66\u544A"]);
    },
    "default_1": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5728\u60F3\u4E9B\u4EC0\u4E48\uFF1F"]);
    },
    "reply_to_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u56DE\u590D ", _interpolate(_list(0))]);
    },
    "replying": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u56DE\u590D"]);
    },
    "the_thread": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8FD9\u4E2A\u5E16\u6587"]);
    }
  },
  "pwa": {
    "dismiss": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5FFD\u7565"]);
    },
    "install": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5B89\u88C5"]);
    },
    "install_title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5B89\u88C5\u9E7F\u9E23"]);
    },
    "title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9E7F\u9E23\u5B58\u5728\u65B0\u7684\u66F4\u65B0"]);
    },
    "update": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u66F4\u65B0"]);
    },
    "update_available_short": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u66F4\u65B0\u9E7F\u9E23"]);
    },
    "webmanifest": {
      "canary": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u4E00\u4E2A\u7075\u5DE7\u7684 Mastodon \u5BA2\u6237\u7AEF\uFF08Canary\uFF09"]);
        },
        "name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u9E7F\u9E23 Canary"]);
        },
        "short_name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u9E7F\u9E23 Canary"]);
        }
      },
      "dev": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u4E00\u4E2A\u7075\u5DE7\u7684 Mastodon \u5BA2\u6237\u7AEF\uFF08\u5F00\u53D1\u7248\uFF09"]);
        },
        "name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u9E7F\u9E23 \u5F00\u53D1\u7248"]);
        },
        "short_name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u9E7F\u9E23 \u5F00\u53D1\u7248"]);
        }
      },
      "preview": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u4E00\u4E2A\u7075\u5DE7\u7684 Mastodon \u5BA2\u6237\u7AEF\uFF08\u9884\u89C8\u7248\uFF09"]);
        },
        "name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u9E7F\u9E23 \u9884\u89C8\u7248"]);
        },
        "short_name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u9E7F\u9E23 \u9884\u89C8\u7248"]);
        }
      },
      "release": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u4E00\u4E2A\u7075\u5DE7\u7684 Mastodon \u5BA2\u6237\u7AEF"]);
        },
        "name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u9E7F\u9E23"]);
        },
        "short_name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u9E7F\u9E23"]);
        }
      }
    }
  },
  "search": {
    "search_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u641C\u7D22\u7528\u6237\u6216\u8BDD\u9898\u6807\u7B7E"]);
    },
    "search_empty": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u65E0\u6CD5\u627E\u5230\u7B26\u5408\u8FD9\u4E9B\u641C\u7D22\u8BCD\u7684\u4EFB\u4F55\u5185\u5BB9"]);
    }
  },
  "settings": {
    "about": {
      "built_at": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u6784\u5EFA\u4E8E"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5173\u4E8E"]);
      },
      "meet_the_team": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u8BA4\u8BC6\u5F00\u53D1\u56E2\u961F"]);
      },
      "sponsor_action": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u8D5E\u52A9\u6211\u4EEC"]);
      },
      "sponsor_action_desc": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u652F\u6301\u56E2\u961F\u5F00\u53D1\u9E7F\u9E23"]);
      },
      "sponsors": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u8D5E\u52A9\u8005"]);
      },
      "sponsors_body_1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9E7F\u9E23\u80FD\u591F\u51FA\u73B0\u8981\u611F\u8C22\u4EE5\u4E0B\u8D5E\u52A9\u8005\u7684\u6177\u6168\u8D5E\u52A9\u548C\u5E2E\u52A9\uFF1A"]);
      },
      "sponsors_body_2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u4EE5\u53CA\u8D5E\u52A9\u9E7F\u9E23\u5F00\u53D1\u56E2\u961F\u548C\u6210\u5458\u7684\u6240\u6709\u516C\u53F8\u548C\u4E2A\u4EBA\u3002"]);
      },
      "sponsors_body_3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5982\u679C\u4F60\u559C\u6B22\u8FD9\u4E2A\u5E94\u7528\u7A0B\u5E8F\uFF0C\u8BF7\u8003\u8651\u8D5E\u52A9\u6211\u4EEC\uFF1A"]);
      },
      "version": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u7248\u672C"]);
      }
    },
    "account_settings": {
      "description": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5728 Mastodon UI \u4E2D\u7F16\u8F91\u4F60\u7684\u8D26\u53F7\u8BBE\u7F6E"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u8D26\u53F7\u8BBE\u7F6E"]);
      }
    },
    "interface": {
      "color_mode": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u989C\u8272"]);
      },
      "dark_mode": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u6DF1\u8272"]);
      },
      "default": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\uFF08\u9ED8\u8BA4\uFF09"]);
      },
      "font_size": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5B57\u53F7"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5916\u89C2"]);
      },
      "light_mode": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u6D45\u8272"]);
      },
      "system_mode": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u8DDF\u968F\u7CFB\u7EDF"]);
      },
      "theme_color": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u4E3B\u9898\u989C\u8272"]);
      }
    },
    "language": {
      "display_language": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9996\u9009\u8BED\u8A00"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u8BED\u8A00"]);
      },
      "status": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u7FFB\u8BD1\u8FDB\u5EA6\uFF1A ", _interpolate(_list(0)), "/", _interpolate(_list(1)), " (", _interpolate(_list(2)), "%)"]);
      },
      "translations": {
        "add": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u6DFB\u52A0"]);
        },
        "choose_language": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u9009\u62E9\u8BED\u8A00"]);
        },
        "heading": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u7FFB\u8BD1"]);
        },
        "hide_specific": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u9690\u85CF\u6307\u5B9A\u7684\u7FFB\u8BD1"]);
        },
        "remove": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u5220\u9664"]);
        }
      }
    },
    "notifications": {
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u901A\u77E5"]);
      },
      "notifications": {
        "label": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u901A\u77E5\u8BBE\u7F6E"]);
        }
      },
      "push_notifications": {
        "alerts": {
          "favourite": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u559C\u6B22\u7684"]);
          },
          "follow": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u65B0\u7684\u5173\u6CE8\u8005"]);
          },
          "mention": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u63D0\u53CA"]);
          },
          "poll": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u6295\u7968"]);
          },
          "reblog": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u8F6C\u53D1\u4E86\u4F60\u7684\u5E16\u6587"]);
          },
          "title": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u63A5\u6536\u4E86\u4EC0\u4E48\u901A\u77E5\uFF1F"]);
          }
        },
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u5F53\u4F60\u6CA1\u6709\u5728\u4F7F\u7528\u9E7F\u9E23\u65F6\u4E5F\u80FD\u63A5\u6536\u901A\u77E5\u3002"]);
        },
        "instructions": (ctx) => {
          const { normalize: _normalize, linked: _linked, type: _type } = ctx;
          return _normalize(["\u4E0D\u8981\u5FD8\u8BB0\u70B9\u51FB ", _linked("settings.notifications.push_notifications.save_settings", void 0, _type), " \u6309\u94AE\u4FDD\u5B58\u6539\u52A8\uFF01"]);
        },
        "label": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u63A8\u9001\u901A\u77E5\u8BBE\u7F6E"]);
        },
        "policy": {
          "all": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u4EFB\u4F55\u4EBA"]);
          },
          "followed": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u6211\u5173\u6CE8\u7684\u4EBA"]);
          },
          "follower": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u5173\u6CE8\u6211\u7684\u4EBA"]);
          },
          "none": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u65E0\u4EBA"]);
          },
          "title": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u6211\u53EF\u4EE5\u4ECE\u8C01\u90A3\u91CC\u63A5\u6536\u901A\u77E5\uFF1F"]);
          }
        },
        "save_settings": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u4FDD\u5B58\u8BBE\u7F6E\u6539\u52A8"]);
        },
        "subscription_error": {
          "clear_error": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u6E05\u9664\u9519\u8BEF"]);
          },
          "invalid_vapid_key": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["VAPID \u5BC6\u94A5\u65E0\u6548\u3002"]);
          },
          "permission_denied": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u6743\u9650\u4E0D\u8DB3\uFF1A\u8BF7\u5728\u4F60\u7684\u6D4F\u89C8\u5668\u4E2D\u6253\u5F00\u901A\u77E5\u6743\u9650\u3002"]);
          },
          "repo_link": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u9E7F\u9E23\u5728 Github \u4E0A\u7684\u4ED3\u5E93"]);
          },
          "request_error": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u8BF7\u6C42\u8BA2\u9605\u65F6\u53D1\u751F\u4E86\u4E00\u4E2A\u9519\u8BEF\uFF0C\u8BF7\u518D\u6B21\u5C1D\u8BD5\u3002\u5982\u9519\u8BEF\u4ECD\u7136\u5B58\u5728\uFF0C\u8BF7\u5230\u9E7F\u9E23\u4EE3\u7801\u4ED3\u5E93\u4E2D\u62A5\u544A\u8FD9\u4E00\u95EE\u9898\u3002"]);
          },
          "title": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u65E0\u6CD5\u8BA2\u9605\u63A8\u9001\u901A\u77E5\u3002"]);
          },
          "too_many_registrations": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u7531\u4E8E\u6D4F\u89C8\u5668\u9650\u5236\uFF0C\u9E7F\u9E23\u65E0\u6CD5\u4E3A\u4E0D\u540C\u670D\u52A1\u5668\u4E0A\u7684\u591A\u4E2A\u5E10\u6237\u4F7F\u7528\u63A8\u9001\u901A\u77E5\u670D\u52A1\u3002\u8BF7\u53D6\u6D88\u8BA2\u9605\u53E6\u4E00\u4E2A\u5E10\u6237\u7684\u63A8\u9001\u901A\u77E5\uFF0C\u7136\u540E\u91CD\u8BD5\u3002"]);
          },
          "vapid_not_supported": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u4F60\u7684\u6D4F\u89C8\u5668\u652F\u6301\u63A8\u9001\u901A\u77E5\u529F\u80FD\uFF0C\u4F46\u4F3C\u4E4E\u6CA1\u6709\u5B9E\u73B0 VAPID \u534F\u8BAE\u3002"]);
          }
        },
        "title": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u63A8\u9001\u901A\u77E5\u8BBE\u7F6E"]);
        },
        "undo_settings": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u64A4\u9500\u8BBE\u7F6E\u6539\u52A8"]);
        },
        "unsubscribe": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u7981\u7528\u684C\u9762\u901A\u77E5"]);
        },
        "unsupported": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u684C\u9762\u901A\u77E5"]);
        },
        "warning": {
          "enable_close": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u5173\u95ED"]);
          },
          "enable_description": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u82E5\u60F3\u5728\u9E7F\u9E23\u6CA1\u6709\u6253\u5F00\u65F6\u63A5\u6536\u901A\u77E5\uFF0C\u8BF7\u542F\u7528\u63A8\u9001\u901A\u77E5\u529F\u80FD\u3002\u4E00\u65E6\u542F\u52A8\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u4E0A\u9762\u7684\u201C\u524D\u5F80\u901A\u77E5\u8BBE\u7F6E\u201D\u6309\u94AE\u6765\u7CBE\u786E\u63A7\u5236\u54EA\u79CD\u7C7B\u578B\u7684\u4E92\u52A8\u53EF\u4EE5\u4EA7\u751F\u63A8\u9001\u901A\u77E5\u3002"]);
          },
          "enable_description_desktop": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u82E5\u60F3\u5728\u9E7F\u9E23\u6CA1\u6709\u6253\u5F00\u65F6\u63A5\u6536\u901A\u77E5\uFF0C\u8BF7\u542F\u7528\u63A8\u9001\u901A\u77E5\u529F\u80FD\u3002\u4E00\u65E6\u542F\u52A8\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7 \u201C\u8BBE\u7F6E\u201D > \u201C\u901A\u77E5\u201D > \u201C\u63A8\u9001\u901A\u77E5\u8BBE\u7F6E\u201D \u6765\u7CBE\u786E\u63A7\u5236\u54EA\u79CD\u7C7B\u578B\u7684\u4E92\u52A8\u53EF\u4EE5\u4EA7\u751F\u684C\u9762\u901A\u77E5\u3002"]);
          },
          "enable_description_mobile": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5BFC\u822A\u83DC\u5355 \u201C\u8BBE\u7F6E\u201D > \u201C\u901A\u77E5\u201D > \u201C\u63A8\u9001\u901A\u77E5\u8BBE\u7F6E\u201D \u8BBF\u95EE\u8BBE\u7F6E\u9875\u9762\u3002"]);
          },
          "enable_description_settings": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u82E5\u60F3\u5728\u9E7F\u9E23\u6CA1\u6709\u6253\u5F00\u65F6\u63A5\u6536\u901A\u77E5\uFF0C\u8BF7\u542F\u7528\u63A8\u9001\u901A\u77E5\u529F\u80FD\u3002\u4E00\u65E6\u542F\u52A8\uFF0C\u4F60\u53EF\u4EE5\u7CBE\u786E\u63A7\u5236\u54EA\u79CD\u7C7B\u578B\u7684\u4E92\u52A8\u4F1A\u5728\u8FD9\u4E2A\u5C4F\u5E55\u4E0A\u4EA7\u751F\u63A8\u9001\u901A\u77E5\u3002"]);
          },
          "enable_desktop": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u542F\u7528\u63A8\u9001\u901A\u77E5"]);
          },
          "enable_title": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u4E0D\u9519\u8FC7\u4EFB\u4F55\u4E8B"]);
          },
          "re_auth": (ctx) => {
            const { normalize: _normalize } = ctx;
            return _normalize(["\u60A8\u7684\u670D\u52A1\u5668\u4F3C\u4E4E\u4E0D\u652F\u6301\u63A8\u9001\u901A\u77E5\u3002\u5C1D\u8BD5\u9000\u51FA\u7528\u6237\u5E76\u91CD\u65B0\u767B\u5F55\u3002\u5982\u679C\u6B64\u6D88\u606F\u4ECD\u7136\u51FA\u73B0\uFF0C\u8BF7\u8054\u7CFB\u60A8\u670D\u52A1\u5668\u7684\u7BA1\u7406\u5458\u3002"]);
          }
        }
      },
      "show_btn": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u524D\u5F80\u901A\u77E5\u8BBE\u7F6E"]);
      },
      "under_construction": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5EFA\u8BBE\u4E2D"]);
      }
    },
    "notifications_settings": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u901A\u77E5"]);
    },
    "preferences": {
      "enable_autoplay": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5F00\u542F\u81EA\u52A8\u64AD\u653E"]);
      },
      "enable_pinch_to_zoom": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u542F\u7528\u53CC\u6307\u7F29\u653E\u529F\u80FD"]);
      },
      "github_cards": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["GitHub \u5361\u7247"]);
      },
      "grayscale_mode": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u7070\u8272\u6A21\u5F0F"]);
      },
      "hide_account_hover_card": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9690\u85CF\u7528\u6237\u60AC\u6D6E\u5361"]);
      },
      "hide_alt_indi_on_posts": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9690\u85CF\u5E16\u6587\u4E0A\u7684\u63CF\u8FF0\u6309\u94AE"]);
      },
      "hide_boost_count": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9690\u85CF\u8F6C\u53D1\u6570"]);
      },
      "hide_favorite_count": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9690\u85CF\u6536\u85CF\u6570"]);
      },
      "hide_follower_count": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9690\u85CF\u5173\u6CE8\u8005\u6570"]);
      },
      "hide_reply_count": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9690\u85CF\u56DE\u590D\u6570"]);
      },
      "hide_translation": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9690\u85CF\u7FFB\u8BD1"]);
      },
      "hide_username_emojis": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9690\u85CF\u7528\u6237\u6635\u79F0\u7684\u8868\u60C5\u7B26\u53F7"]);
      },
      "hide_username_emojis_description": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9690\u85CF\u65F6\u95F4\u7EBF\u4E0A\u7528\u6237\u7684\u8868\u60C5\u7B26\u53F7\u3002\u8868\u60C5\u7B26\u53F7\u4ECD\u7136\u4F1A\u5728\u7528\u6237\u4E2A\u4EBA\u8D44\u6599\u4E2D\u5C55\u793A\u3002"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u9996\u9009\u9879"]);
      },
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5B9E\u9A8C\u529F\u80FD"]);
      },
      "user_picker": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u7528\u6237\u9009\u62E9\u5668"]);
      },
      "virtual_scroll": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u865A\u62DF\u6EDA\u52A8"]);
      },
      "wellbeing": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u793E\u4EA4\u504F\u597D"]);
      }
    },
    "profile": {
      "appearance": {
        "bio": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u7B80\u4ECB"]);
        },
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u7F16\u8F91\u4E2A\u4EBA\u8D44\u6599\uFF0C\u4F8B\u5982\u5934\u50CF\u3001\u7528\u6237\u540D\u3001\u4E2A\u4EBA\u7B80\u4ECB\u7B49\u3002"]);
        },
        "display_name": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u6635\u79F0"]);
        },
        "label": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u4E2A\u4EBA\u8D44\u6599"]);
        },
        "profile_metadata": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u4E2A\u4EBA\u8D44\u6599\u9644\u52A0\u4FE1\u606F"]);
        },
        "profile_metadata_desc": (ctx) => {
          const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
          return _normalize(["\u8FD9\u5C06\u4F1A\u5728\u4E2A\u4EBA\u8D44\u6599\u9875\u4E0A\u4EE5\u8868\u683C\u7684\u5F62\u5F0F\u5C55\u793A\uFF0C\u6700\u591A ", _interpolate(_list(0)), " \u4E2A\u9879\u76EE"]);
        },
        "profile_metadata_label": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u63CF\u8FF0"]);
        },
        "profile_metadata_value": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u5185\u5BB9"]);
        },
        "title": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u7F16\u8F91\u4E2A\u4EBA\u8D44\u6599"]);
        }
      },
      "featured_tags": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u4EBA\u4EEC\u53EF\u4EE5\u5728\u8FD9\u4E9B\u6807\u7B7E\u4E0B\u6D4F\u89C8\u4F60\u7684\u516C\u5171\u561F\u6587\u3002"]);
        },
        "label": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["\u7CBE\u9009\u8BDD\u9898\u6807\u7B7E"]);
        }
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u4E2A\u4EBA\u8D44\u6599"]);
      }
    },
    "select_a_settings": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5728\u5DE6\u4FA7\u9009\u62E9\u4E00\u4E2A\u8BBE\u7F6E"]);
    },
    "users": {
      "export": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5BFC\u51FA\u7528\u6237\u4EE4\u724C"]);
      },
      "import": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5BFC\u5165\u7528\u6237\u4EE4\u724C"]);
      },
      "label": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5F53\u524D\u7528\u6237"]);
      }
    }
  },
  "share-target": {
    "description": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53EA\u9700\u8981\u5728\u4F60\u7684\u8BBE\u5907\u6216\u7535\u8111\u4E0A\u5B89\u88C5\u5E76\u767B\u5F55\u9E7F\u9E23\uFF0C\u901A\u8FC7\u7B80\u5355\u7684\u914D\u7F6E\uFF0C\u4F60\u5C31\u53EF\u4EE5\u4ECE\u5176\u4ED6\u5E94\u7528\u4E2D\u5206\u4EAB\u5185\u5BB9\u81F3\u9E7F\u9E23\u3002"]);
    },
    "hint": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E3A\u4E86\u5206\u4EAB\u5185\u5BB9\u81F3\u9E7F\u9E23\uFF0C\u4F60\u5FC5\u987B\u5B89\u88C5\u5E76\u767B\u5F55\u9E7F\u9E23\u3002"]);
    },
    "title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5206\u4EAB\u81F3\u9E7F\u9E23"]);
    }
  },
  "state": {
    "attachments_exceed_server_limit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9644\u4EF6\u7684\u6570\u91CF\u8D85\u51FA\u4E86\u6700\u5927\u9650\u5236"]);
    },
    "attachments_limit_error": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8D85\u51FA\u6BCF\u7BC7\u5E16\u6587\u7684\u6700\u5927\u9650\u5236"]);
    },
    "edited": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\uFF08\u5DF2\u7F16\u8F91\uFF09"]);
    },
    "editing": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7F16\u8F91\u4E2D"]);
    },
    "loading": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u52A0\u8F7D\u4E2D..."]);
    },
    "publish_failed": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53D1\u5E03\u5931\u8D25"]);
    },
    "publishing": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53D1\u5E03\u4E2D..."]);
    },
    "upload_failed": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E0A\u4F20\u5931\u8D25"]);
    },
    "uploading": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E0A\u4F20\u4E2D..."]);
    }
  },
  "status": {
    "boosted_by": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u88AB\u8F6C\u53D1"]);
    },
    "edited": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u5728 ", _interpolate(_list(0)), " \u7F16\u8F91\u4E86"]);
    },
    "favourited_by": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u88AB\u559C\u6B22"]);
    },
    "filter_hidden_phrase": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7B5B\u9009\u4F9D\u636E"]);
    },
    "filter_removed_phrase": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4ECE\u7B5B\u9009\u4E2D\u79FB\u9664"]);
    },
    "filter_show_anyway": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4ECD\u7136\u5C55\u793A"]);
    },
    "img_alt": {
      "ALT": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["ALT"]);
      },
      "desc": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u63CF\u8FF0"]);
      },
      "dismiss": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u5173\u95ED"]);
      },
      "read": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u67E5\u770B ", _interpolate(_list(0)), " \u7684\u63CF\u8FF0"]);
      }
    },
    "poll": {
      "count": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize([_interpolate(_list(0)), " \u6B21\u6295\u7968"]);
      },
      "ends": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u5C06\u5728 ", _interpolate(_list(0)), " \u7ED3\u675F"]);
      },
      "finished": (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
        return _normalize(["\u5DF2\u5728 ", _interpolate(_list(0)), " \u7ED3\u675F"]);
      }
    },
    "reblogged": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize([_interpolate(_list(0)), " \u8F6C\u53D1\u4E86"]);
    },
    "replying_to": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u56DE\u590D", _interpolate(_list(0))]);
    },
    "show_full_thread": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u663E\u793A\u5B8C\u6574\u8D34\u6587\u4E32"]);
    },
    "someone": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u67D0\u4EBA"]);
    },
    "spoiler_show_less": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9690\u85CF"]);
    },
    "spoiler_show_more": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u663E\u793A\u66F4\u591A"]);
    },
    "thread": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5E16\u6587\u4E32"]);
    },
    "try_original_site": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5C1D\u8BD5\u4ECE\u6E90\u7AD9\u6253\u5F00"]);
    }
  },
  "status_history": {
    "created": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u5728 ", _interpolate(_list(0)), " \u53D1\u5E03\u4E86"]);
    },
    "edited": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u5728 ", _interpolate(_list(0)), " \u7F16\u8F91\u4E86"]);
    }
  },
  "tab": {
    "accounts": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7528\u6237"]);
    },
    "for_you": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u63A8\u8350\u5173\u6CE8"]);
    },
    "hashtags": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8BDD\u9898\u6807\u7B7E"]);
    },
    "list": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5217\u8868"]);
    },
    "media": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5A92\u4F53"]);
    },
    "news": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6700\u65B0\u6D88\u606F"]);
    },
    "notifications_all": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5168\u90E8"]);
    },
    "notifications_mention": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u63D0\u53CA"]);
    },
    "posts": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5E16\u6587"]);
    },
    "posts_with_replies": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5E16\u6587\u4E0E\u7559\u8A00"]);
    }
  },
  "tag": {
    "follow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5173\u6CE8"]);
    },
    "follow_label": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u5173\u6CE8 ", _interpolate(_list(0)), " \u6807\u7B7E"]);
    },
    "unfollow": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u53D6\u6D88\u5173\u6CE8"]);
    },
    "unfollow_label": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u53D6\u6D88\u5173\u6CE8 ", _interpolate(_list(0)), " \u6807\u7B7E"]);
    }
  },
  "time_ago_options": {
    "day_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["\u660E\u5929"]), _normalize([_interpolate(_named("n")), " \u5929\u540E"])]);
    },
    "day_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["\u6628\u5929"]), _normalize([_interpolate(_named("n")), " \u5929\u524D"])]);
    },
    "hour_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["1 \u5C0F\u65F6\u540E"]), _normalize([_interpolate(_named("n")), " \u5C0F\u65F6\u540E"])]);
    },
    "hour_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["1 \u5C0F\u65F6\u524D"]), _normalize([_interpolate(_named("n")), " \u5C0F\u65F6\u524D"])]);
    },
    "just_now": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u521A\u521A"]);
    },
    "minute_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["1 \u5206\u949F\u540E"]), _normalize([_interpolate(_named("n")), " \u5206\u949F\u540E"])]);
    },
    "minute_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["1 \u5206\u949F\u524D"]), _normalize([_interpolate(_named("n")), " \u5206\u949F\u524D"])]);
    },
    "month_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["\u4E0B\u4E2A\u6708"]), _normalize([_interpolate(_named("n")), " \u4E2A\u6708\u540E"])]);
    },
    "month_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["\u4E0A\u4E2A\u6708"]), _normalize([_interpolate(_named("n")), " \u4E2A\u6708\u524D"])]);
    },
    "second_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u521A\u521A"]), _normalize([_interpolate(_named("n")), " \u79D2\u540E"]), _normalize([_interpolate(_named("n")), " \u79D2\u540E"])]);
    },
    "second_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u521A\u521A"]), _normalize([_interpolate(_named("n")), " \u79D2\u524D"]), _normalize([_interpolate(_named("n")), " \u79D2\u524D"])]);
    },
    "short_day_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u5929"]);
    },
    "short_day_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u5929"]);
    },
    "short_hour_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u5C0F\u65F6"]);
    },
    "short_hour_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u5C0F\u65F6"]);
    },
    "short_minute_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u5206"]);
    },
    "short_minute_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u5206"]);
    },
    "short_month_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u6708"]);
    },
    "short_month_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u6708"]);
    },
    "short_second_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u79D2"]);
    },
    "short_second_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u79D2"]);
    },
    "short_week_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u5468"]);
    },
    "short_week_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u5468"]);
    },
    "short_year_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u5E74"]);
    },
    "short_year_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize([_interpolate(_named("n")), " \u5E74"]);
    },
    "week_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["\u4E0B\u5468"]), _normalize([_interpolate(_named("n")), " \u5468\u540E"])]);
    },
    "week_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["\u4E0A\u5468"]), _normalize([_interpolate(_named("n")), " \u5468\u524D"])]);
    },
    "year_future": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["\u660E\u5E74"]), _normalize([_interpolate(_named("n")), " \u5E74\u540E"])]);
    },
    "year_past": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named, plural: _plural } = ctx;
      return _plural([_normalize(["\u73B0\u5728"]), _normalize(["\u53BB\u5E74"]), _normalize([_interpolate(_named("n")), " \u5E74\u524D"])]);
    }
  },
  "timeline": {
    "show_new_items": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize(["\u5C55\u793A ", _interpolate(_named("v")), " \u6761\u65B0\u5E16\u6587"]);
    },
    "view_older_posts": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5176\u4ED6\u7AD9\u70B9\u4E0A\u66F4\u8001\u7684\u5E16\u6587\u53EF\u80FD\u4E0D\u4F1A\u5728\u8FD9\u91CC\u663E\u793A\u3002"]);
    }
  },
  "title": {
    "federated_timeline": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8DE8\u7AD9\u65F6\u95F4\u7EBF"]);
    },
    "local_timeline": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u672C\u5730\u65F6\u95F4\u7EBF"]);
    }
  },
  "tooltip": {
    "add_content_warning": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6DFB\u52A0\u5185\u5BB9\u8B66\u544A\u6807\u8BC6"]);
    },
    "add_emojis": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6DFB\u52A0\u8868\u60C5\u7B26\u53F7"]);
    },
    "add_media": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6DFB\u52A0\u56FE\u7247\u3001\u89C6\u9891\u6216\u8005\u97F3\u9891\u6587\u4EF6"]);
    },
    "add_publishable_content": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6DFB\u52A0\u8981\u53D1\u5E03\u7684\u5185\u5BB9"]);
    },
    "change_content_visibility": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4FEE\u6539\u5185\u5BB9\u662F\u5426\u53EF\u89C1"]);
    },
    "change_language": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u66F4\u6539\u8BED\u8A00"]);
    },
    "emoji": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8868\u60C5\u7B26\u53F7"]);
    },
    "explore_links_intro": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8FD9\u4E9B\u65B0\u95FB\u6545\u4E8B\u6B63\u88AB\u672C\u7AD9\u548C\u5206\u5E03\u5F0F\u7F51\u7EDC\u4E0A\u5176\u4ED6\u7AD9\u70B9\u7684\u7528\u6237\u8C08\u8BBA\u3002"]);
    },
    "explore_posts_intro": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6765\u81EA\u672C\u7AD9\u548C\u5206\u5E03\u5F0F\u7F51\u7EDC\u4E0A\u5176\u4ED6\u7AD9\u70B9\u7684\u8FD9\u4E9B\u561F\u6587\u6B63\u5728\u672C\u7AD9\u5F15\u8D77\u5173\u6CE8\u3002"]);
    },
    "explore_tags_intro": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u8FD9\u4E9B\u6807\u7B7E\u6B63\u5728\u672C\u7AD9\u548C\u5206\u5E03\u5F0F\u7F51\u7EDC\u4E0A\u5176\u4ED6\u7AD9\u70B9\u7684\u7528\u6237\u4E2D\u5F15\u8D77\u5173\u6CE8\u3002"]);
    },
    "open_editor_tools": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u7F16\u8F91\u5668\u5DE5\u5177"]);
    },
    "publish_failed": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5173\u95ED\u7F16\u8F91\u5668\u4E0A\u65B9\u7684\u9519\u8BEF\u4FE1\u606F\u4EE5\u91CD\u65B0\u53D1\u5E03\u5E16\u6587\u3002"]);
    },
    "toggle_bold": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5207\u6362\u52A0\u7C97"]);
    },
    "toggle_code_block": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5207\u6362\u4EE3\u7801\u5757"]);
    },
    "toggle_italic": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5207\u6362\u659C\u4F53"]);
    }
  },
  "user": {
    "add_existing": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6DFB\u52A0\u73B0\u6709\u5E10\u6237"]);
    },
    "server_address_label": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Mastodon \u670D\u52A1\u5668\u5730\u5740"]);
    },
    "sign_in_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u767B\u5F55\u540E\u53EF\u5173\u6CE8\u5176\u4ED6\u4EBA\u6216\u6807\u7B7E\u3001\u70B9\u8D5E\u3001\u5206\u4EAB\u548C\u56DE\u590D\u5E16\u6587\uFF0C\u6216\u4E0E\u4E0D\u540C\u670D\u52A1\u5668\u4E0A\u7684\u8D26\u53F7\u4EA4\u4E92\u3002"]);
    },
    "sign_in_notice_title": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u6B63\u5728\u67E5\u770B ", _interpolate(_list(0)), " \u7684\u516C\u5171\u6570\u636E"]);
    },
    "sign_out_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u767B\u51FA ", _interpolate(_list(0))]);
    },
    "single_instance_sign_in_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u767B\u5F55\u540E\u53EF\u5173\u6CE8\u5176\u4ED6\u4EBA\u6216\u6807\u7B7E\u3001\u6536\u85CF\u3001\u5206\u4EAB\u548C\u56DE\u590D\u5E16\u6587\u3002"]);
    },
    "tip_no_account": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, list: _list } = ctx;
      return _normalize(["\u5982\u679C\u60A8\u8FD8\u6CA1\u6709 Mastodon \u8D26\u6237\uFF0C", _interpolate(_list(0)), "\u3002"]);
    },
    "tip_register_account": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u9009\u62E9\u60A8\u7684\u670D\u52A1\u5668\u5E76\u6CE8\u518C\u4E00\u4E2A"]);
    }
  },
  "visibility": {
    "direct": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u79C1\u4FE1"]);
    },
    "direct_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4EC5\u5BF9\u63D0\u53CA\u7684\u7528\u6237\u53EF\u89C1"]);
    },
    "private": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4EC5\u9650\u5173\u6CE8\u8005"]);
    },
    "private_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4EC5\u5173\u6CE8\u8005\u53EF\u89C1"]);
    },
    "public": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u516C\u5F00"]);
    },
    "public_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u6240\u6709\u4EBA\u53EF\u89C1"]);
    },
    "unlisted": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u4E0D\u5217\u51FA"]);
    },
    "unlisted_desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u5BF9\u6240\u6709\u4EBA\u53EF\u89C1\uFF0C\u4F46\u4E0D\u51FA\u73B0\u5728\u516C\u5171\u65F6\u95F4\u7EBF\u4E0A"]);
    }
  }
};

export { resource as default };
//# sourceMappingURL=zh-CN-468e4fb7.mjs.map
