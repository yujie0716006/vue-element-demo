const Mock = require('mockjs')
export const foodsData =  Mock.mock({
  "array|20": [
    {
      "foodId|+1": 1,
      "info": {
        "foodId|+1": 0,
        "name": "@csentence(5)",
        "description": "硅谷专送",
        "deliveryTime|20-50": 28,
        "score": 4.2,
        "serviceScore": 4.1,
        "foodScore": 4.3,
        "rankRate|1-100.0-9": 69.2,
        "minPrice|1-50": 20,
        "deliveryPrice|1-9": 4,
        "ratingCount|1-100": 24,
        "sellCount|1-100": 90,
        "distance": "1000m",
        "bulletin": '@cparagraph()',
        "supports|3-4": [
          {
            "type|0-2": 0,
            "name": "@region()",
            "content": "@csentence()"
          },
        ],
        "avatar": "https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg",
        "bgImg": "https://fuss10.elemecdn.com/f/5c/ead54394c3de198d3e6d3e9111bbfpng.png",
        "pics|5": [
          "https://fuss10.elemecdn.com/f/7f/d1422ec824a0a9d1fb879c57ab533jpeg.jpeg",
        ],
        "category": "@csentence(5)",
        "phone": "@integer(10000)",
        "address": "@county(true)",
        "workTime": "@now()"
      },
      "goods|10": [
        {
          "name|1-12": 1,
          "icon": "https://fuss10.elemecdn.com/b/91/8cf4f67e0e8223931cd595dc932fepng.png",
          "foods|1-2": [
            {
              "name": "南瓜粥",
              "price|0-9": 9,
              "oldPrice": "",
              "description": "@city",
              "sellCount|50-99": 91,
              "rating|10-99": 100,
              "info": "@csentence",
              "ratings|3-6": [
                {
                  "username": "3******c",
                  "rateTime": '@id',
                  "rateType|0-1": 0,
                  "text": "@county",
                  "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                },
              ],
              "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
              "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750",
              "images": [
                "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750",
              ]
            },
            {
              "name": "小米粥",
              "price|0-9": 9,
              "oldPrice": "",
              "description": "@city",
              "sellCount|50-99": 91,
              "rating|10-99": 100,
              "info": "@csentence",
              "ratings|3-6": [
                {
                  "username": "3******c",
                  "rateTime": '@id',
                  "rateType|0-1": 0,
                  "text": "@county",
                  "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                },
              ],
              "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
              "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750",
              "images": [
                "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750",
              ]
            },
          ]
        }
      ],
      "ratings|10": [
        {
          "username": "3******c",
          "rateTime": ' @id',
          "deliveryTime": 30,
          "score": 5,
          "rateType|0-1": 0,
          "text": "不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": [
            "南瓜粥",
            "皮蛋瘦肉粥",
            "扁豆焖面",
            "娃娃菜炖豆腐",
            "牛肉馅饼"
          ]
        }
      ]
    }
  ]
})
