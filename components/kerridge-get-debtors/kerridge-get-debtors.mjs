import axios from "axios"

export default {
  name: "Kerridge Get Debtors",
  version: "0.0.1",
  key: "kerridge-get-debtors",
  description: "",
  props: {
    url: {
      type: 'string',
      label: 'url',
    },
    adminCode: {
      type: 'string',
      label: 'Admin Code'
    },
    select: {
      type: 'string',
      label: 'Select',
    },
    limit: {
      type: 'integer',
      label: 'Limit'
    },
    authorization: {
      type: 'string',
      label: 'Authorization Token',
    },
  },
  type: "action",
  methods: {},
  async run({ steps, $ }) {
    const res = await axios.get(`${this.url}/${this.adminCode}/debtorProducts?select=${this.select}&limit=${this.limit}`, {
        headers: {
            'accept': 'application/json',
            'authorization' : this.authorization
        }
    });
    const products = res.data.map((item) => {
        return {
            'id': item.id,
            'productCode': item.debtorProductCode,
            'isMapped': true,
        }
    });

    return {
        root: process.env.kerridge_root,
        products: products,
        directives: [
            {
                operation: 'skipIfNotEmpty',
                fields: [
                    {
                        'item 1': 'name',
                        'item 2': 'description',
                    }
                ]
            }
        ]
    }
  }
};
