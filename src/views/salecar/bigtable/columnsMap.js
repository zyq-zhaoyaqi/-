import React from 'react';

export default {
    'price': {
        'title': '价格'
    },
    'id': {
        'title': '编号'
    },
    'image': {
        'title': '图片',
        'render': (txt, {id}) => {
            return <div>
                <img src={`/api/images/carimages_small/${id}/view/${txt}`} />
            </div>;
        }
    },
    'brand': {
        'title': '品牌'
    },
    'series': {
        'title': '车系'
    },
    'exhaust': {
        'title': '排放'
    },
    'color': {
        'title': '颜色'
    },
    'fuel': {
        'title': '燃料'
    },
    'buydate': {
        'title': '购买日期'
    }
};