<template>
  <v-select
    v-model="localState"
    :items="listItems"
    :label="label"
    :item-text="itemText"
    :item-value="itemValue"
    :return-object="returnObject"
    :multiple="multiple"
    :small-chips="chips"
    :loading="loading"
    hide-details="auto"
    :error-messages="errorMessages"
    :append-outer-icon="refreshIcon ? 'mdi-refresh-circle' : null"
    @click:append-outer="getListItems"
    persistent-hint
    :hint="hint"
    :prefix="prefix"
    deletable-chips
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Object, Number, Array],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    errorMessages: {
      type: Array,
      default: function() {
        return []
      }
    },
    itemText: {
      type: String,
      default: 'name'
    },
    itemValue: {
      type: String,
      default: 'id'
    },
    dispatchName: {
      type: String,
      required: true
    },
    dispatchParams: {
      type: [String, Object, Number],
      default: null
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: null
    },
    prefix: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    chips: {
      type: Boolean,
      default: false
    },
    refreshIcon: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      loading: false,
      listItems: []
    }
  },

  computed: {
    localState: {
      get(){ return this.value },
      set(val) { this.$emit('input', val)}
    }
  },

  created() {
    this.getListItems()
  },

  methods: {
    getListItems(){
      this.loading = true
      this.$store.dispatch(this.dispatchName, this.dispatchParams).then( (resp) =>{
        this.listItems = resp.data
      }).finally( () => {
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>