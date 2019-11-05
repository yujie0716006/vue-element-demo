<template>
  <div>
    搜索
    <form id="myForm" name="myForm">
      <div>
        <label for="username">Enter name:</label>
        <input type="text" id="username" name="username">
      </div>
      <div>
        <label for="useracc">Enter account number:</label>
        <input type="text" id="useracc" name="useracc">
      </div>
      <div>
        <label for="userfile">Upload file:</label>
        <input type="file" id="userfile" name="userfile">
      </div>
      <input type="submit" value="Submit!" @click.stop.prevent="handleSubmit">
    </form>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {}
    },
    methods: {
      handleSubmit () {
        var myForm = document.getElementById('myForm');
        const formData = new FormData(myForm);
        console.log('formData', formData)
  }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
