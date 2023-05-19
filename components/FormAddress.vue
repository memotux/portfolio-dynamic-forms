<script setup lang="ts">
const { form, $v } = useWizard()
if (form.name && !form.recipient) {
  $v.value.recipient.$model = form.name
}
</script>

<template>
  <div>
    <h1 class="title">Delivery details</h1>

    <h2 class="subtitle">
      Where should we send your freshly roasted coffee beans?
    </h2>

    <form class="form">
      <div class="form-group">
        <label class="form-label" for="delivery_name">Name</label>
        <input v-model="$v.recipient.$model" type="text" placeholder="Recipients Name"
          class="form-control" id="delivery_name">
        <div v-if="$v.recipient.$error" class="error">field is required</div>
      </div>

      <div class="form-group">
        <label class="form-label" for="address">Address</label>
        <textarea v-model="($v.address.$model as string)"
          placeholder="London Street 470978 New England" rows="3" class="form-control"
          id="address"></textarea>
        <div v-if="$v.address.$error" class="error">field is required</div>
      </div>
    </form>
  </div>
</template>