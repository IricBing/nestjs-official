import { OfficialMenu } from './official-menu.interface';

/** 公众号菜单类型 */
export interface OfficialCustomMenu extends OfficialMenu {
  /** 菜单匹配规则 */
  matchrule: {
    /** 用户标签的id，可通过用户标签管理接口获取 */
    tag_id?: string;
    /** 性别：男（1）女（2），不填则不做匹配 */
    sex?: '1' | '2';
    /** 客户端版本，当前只具体到系统型号：IOS(1), Android(2),Others(3)，不填则不做匹配 */
    client_platform_type?: '1' | '2' | '3';
    /** 国家信息，是用户在微信中设置的地区，具体请参考地区信息表 */
    country?: string;
    /** 省份信息，是用户在微信中设置的地区，具体请参考地区信息表 */
    province?: string;
    /** 城市信息，是用户在微信中设置的地区，具体请参考地区信息表 */
    city?: string;
    /** 语言信息，是用户在微信中设置的语言 */
    language?: string;
  };
}
