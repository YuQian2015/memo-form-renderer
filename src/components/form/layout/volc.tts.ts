interface SpeechCreateParams {
  scene: string
  voice_type: string
  emotion: string
  language: string
}

import { AimForm } from "../types";
export const layout: AimForm<Partial<SpeechCreateParams>> = {
  storageKey: "tts:volc:selected",
  nodes: [{
    id: "1",
    url: "",
    component: "@components/Select",
    label: "场景",
    name: "scene",
    data: {
      placeholder: "选择场景",
      options: [{
        value: "common",
        label: "通用场景"
      }, {
        value: "reading",
        label: "有声阅读"
      }, {
        value: "assistant",
        label: "智能助手"
      }, {
        value: "video",
        label: "视频配音"
      }, {
        value: "special",
        label: "特色音色"
      },
      {
        value: "ads",
        label: "广告配音"
      },
      {
        value: "news",
        label: "新闻播报"
      }, {
        value: "education",
        label: "教育场景"
      }, {
        value: "dialect",
        label: "方言配音"
      },
      ]
    }
  }, {
    id: "2",
    url: "",
    component: "@components/Select",
    label: "tts.speaker",
    name: "voice_type",
    data: {
      placeholder: "选择音色",
      filterKey: "scene",
      filterOptions: {
        common: [
          { value: "BV700_V2_streaming", label: "灿灿 2.0" },
          { value: "BV701_V2_streaming", label: "擎苍" },
          { value: "BV001_V2_streaming", label: "通用女声" },
          { value: "BV700_streaming", label: "灿灿" },
          { value: "BV406_V2_streaming", label: "超自然音色-梓梓2.0" },
          { value: "BV406_streaming", label: "超自然音色-梓梓" },
          { value: "BV407_V2_streaming", label: "超自然音色-燃燃2.0" },
          { value: "BV407_streaming", label: "超自然音色-燃燃" },
          { value: "BV001_streaming", label: "通用女声" },
          { value: "BV002_streaming", label: "通用男声" }
        ],
        reading: [
          { "label": "擎苍", value: "BV701_streaming" },
          { "label": "阳光青年", value: "BV123_streaming" },
          { "label": "反卷青年", value: "BV120_streaming" },
          { "label": "通用赘婿", value: "BV119_streaming" },
          { "label": "古风少御", value: "BV115_streaming" },
          { "label": "霸气青叔", value: "BV107_streaming" },
          { "label": "质朴青年", value: "BV100_streaming" },
          { "label": "温柔淑女", value: "BV104_streaming" },
          { "label": "开朗青年", value: "BV004_streaming" },
          { "label": "甜宠少御", value: "BV113_streaming" },
          { "label": "儒雅青年", value: "BV102_streaming" }
        ],
        assistant: [
          { "label": "甜美小源", "value": "BV405_streaming" },
          { "label": "亲切女声", "value": "BV007_streaming" },
          { "label": "知性女声", "value": "BV009_streaming" },
          { "label": "诚诚", "value": "BV419_streaming" },
          { "label": "童童", "value": "BV415_streaming" },
          { "label": "亲切男声", "value": "BV008_streaming" }
        ],
        video: [
          { "label": "译制片男声", "value": "BV408_streaming" },
          { "label": "懒小羊", "value": "BV426_streaming" },
          { "label": "清新文艺女声", "value": "BV428_streaming" },
          { "label": "鸡汤女声", "value": "BV403_streaming" },
          { "label": "智慧老者", "value": "BV158_streaming" },
          { "label": "慈爱姥姥", "value": "BV157_streaming" },
          { "label": "说唱小哥", "value": "BR001_streaming" },
          { "label": "活力解说男", "value": "BV410_streaming" },
          { "label": "影视解说小帅", "value": "BV411_streaming" },
          { "label": "解说小帅-多情感", "value": "BV437_streaming" },
          { "label": "影视解说小美", "value": "BV412_streaming" },
          { "label": "纨绔青年", "value": "BV159_streaming" },
          { "label": "直播一姐", "value": "BV418_streaming" },
          { "label": "反卷青年", "value": "BV120_streaming" },
          { "label": "沉稳解说男", "value": "BV142_streaming" },
          { "label": "潇洒青年", "value": "BV143_streaming" },
          { "label": "阳光男声", "value": "BV056_streaming" },
          { "label": "活泼女声", "value": "BV005_streaming" },
          { "label": "小萝莉", "value": "BV064_streaming" }
        ],
        special: [
          { "label": "奶气萌娃", "value": "BV051_streaming" },
          { "label": "动漫海绵", "value": "BV063_streaming" },
          { "label": "动漫海星", "value": "BV417_streaming" },
          { "label": "动漫小新", "value": "BV050_streaming" },
          { "label": "天才童声", "value": "BV061_streaming" }
        ],
        ads: [
          { "label": "促销男声", "value": "BV401_streaming" },
          { "label": "促销女声", "value": "BV402_streaming" },
          { "label": "磁性男声", "value": "BV006_streaming" }
        ],
        news: [
          { "label": "新闻女声", "value": "BV011_streaming" },
          { "label": "新闻男声", "value": "BV012_streaming" }
        ],
        education: [
          { "label": "知性姐姐-双语", "value": "BV034_streaming" },
          { "label": "温柔小哥", "value": "BV033_streaming" }
        ],
        dialect: [
          { "label": "东北话 东北老铁", "value": "BV021_streaming" },
          { "label": "东北话 东北丫头", "value": "BV020_streaming" },

          { "label": "西安话 西安佟掌柜", "value": "BV210_streaming" },

          { "label": "上海话 沪上阿姐", "value": "BV217_streaming" },

          { "label": "广西普通话 广西表哥", "value": "BV213_streaming" },

          { "label": "台湾普通话 甜美台妹", "value": "BV025_streaming" },
          { "label": "台湾普通话 台普男声", "value": "BV227_streaming" },

          { "label": "粤语 港剧男神", "value": "BV026_streaming" },
          { "label": "粤语 广东女仔", "value": "BV424_streaming" },

          { "label": "天津话 相声演员", "value": "BV212_streaming" },

          { "label": "川渝话 重庆小伙", "value": "BV019_streaming" },
          { "label": "川渝话 四川甜妹儿", "value": "BV221_streaming" },
          { "label": "川渝话 重庆幺妹儿", "value": "BV423_streaming" },

          { "label": "郑州话 乡村企业家", "value": "BV214_streaming" },
          { "label": "湖南普通话 湖南妹坨", "value": "BV226_streaming" },
          { "label": "长沙话 长沙靓女", "value": "BV216_streaming" }
        ]
      },
    }
  }, {
    id: "3",
    url: "",
    component: "@components/Select",
    label: "选择感情",
    name: "emotion",
    data: {
      placeholder: "选择感情",
      useFilterHide: true,
      filterKey: "voice_type",
      filterOptions: {
        BV700_V2_streaming: [{ "label": "愉悦", "value": "pleased" }, { "label": "抱歉 ", "value": "sorry" }, { "label": "嗔怪 ", "value": "annoyed" }, { "label": "客服", "value": "customer_service" }, { "label": "专业", "value": "professional" }, { "label": "严肃", "value": "serious" }, { "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "哭腔", "value": "tear" }, { "label": "绿茶", "value": "conniving" }, { "label": "安慰鼓励", "value": "comfort" }, { "label": "情感电台", "value": "radio" }, { "label": "撒娇", "value": "lovey-dovey" }, { "label": "傲娇", "value": "tsundere" }, { "label": "娇媚", "value": "charming" }, { "label": "瑜伽", "value": "yoga" }, { "label": "讲故事", "value": "storytelling" }],
        BV701_V2_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "哭腔", "value": "tear" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }, { "label": "旁白-沉浸", "value": "narrator_immersive" }],
        BV700_streaming: [{ "label": "愉悦", "value": "pleased" }, { "label": "抱歉 ", "value": "sorry" }, { "label": "嗔怪 ", "value": "annoyed" }, { "label": "客服", "value": "customer_service" }, { "label": "专业", "value": "professional" }, { "label": "严肃", "value": "serious" }, { "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "哭腔", "value": "tear" }, { "label": "绿茶", "value": "conniving" }, { "label": "安慰鼓励", "value": "comfort" }, { "label": "情感电台", "value": "radio" }, { "label": "撒娇", "value": "lovey-dovey" }, { "label": "傲娇", "value": "tsundere" }, { "label": "娇媚", "value": "charming" }, { "label": "瑜伽", "value": "yoga" }, { "label": "讲故事", "value": "storytelling" }],
        BV701_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "哭腔", "value": "tear" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }, { "label": "旁白-沉浸", "value": "narrator_immersive" }],
        BV001_streaming: [{ "label": "客服", "value": "customer_service" }, { "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "安慰鼓励", "value": "comfort" }, { "label": "讲故事", "value": "storytelling" }, { "label": "广告", "value": "advertising" }, { "label": "助手", "value": "assistant" }],
        BV406_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }],
        BV123_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }],
        BV120_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }],
        BV119_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }],
        BV115_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }],
        BV107_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }],
        BV100_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }],
        BV104_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }],
        BV004_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }],
        BV113_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }],
        BV102_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }],
        BV405_streaming: [{ "label": "愉悦", "value": "pleased" }, { "label": "抱歉 ", "value": "sorry" }, { "label": "专业", "value": "professional" }, { "label": "严肃", "value": "serious" }],
        BV009_streaming: [{ "label": "愉悦", "value": "pleased" }, { "label": "抱歉 ", "value": "sorry" }, { "label": "专业", "value": "professional" }, { "label": "严肃", "value": "serious" }],
        BV008_streaming: [{ "label": "愉悦", "value": "pleased" }, { "label": "抱歉 ", "value": "sorry" }, { "label": "专业", "value": "professional" }, { "label": "严肃", "value": "serious" }],
        BV064_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }],
        BV437_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }],
        BV511_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }],
        BV040_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }],
        BV138_streaming: [{ "label": "开心", "value": "happy" }, { "label": "悲伤", "value": "sad" }, { "label": "愤怒", "value": "angry" }, { "label": "害怕", "value": "scare" }, { "label": "厌恶", "value": "hate" }, { "label": "惊讶", "value": "surprise" }, { "label": "平和", "value": "novel_dialog" }, { "label": "旁白-舒缓", "value": "narrator" }]
      }
    }
  }],
  data: {
    voice_type: "BV700_V2_streaming",
    scene: "common",
    emotion: "happy"
  },
  actions: {}
};