import { world, Player, system } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

world.beforeEvents.itemUseOn.subscribe(async beforeItemUseEvent => {
  if (!(beforeItemUseEvent.source instanceof Player)) return;
  
  const user = beforeItemUseEvent.source;

  system.run(()=> {
      // モーダルフォームを組み立てる
    const modalForm = new ModalFormData().title('simple-server-ui');
    modalForm.dropdown("chose one", ["A", "B"]);
    modalForm.slider("slide", -10, 20, 5, 0);
    modalForm.textField("textField", "input here", "");
    modalForm.toggle("toggle switch", false);

    // モーダルフォームを表示する
    modalForm.show(user).then(response => {
      if(response.canceled){
        // フォームが閉じられた場合
        user.runCommand("say canceled");
      } else {
        // 送信ボタンが押された場合
        if (response.formValues !== undefined) {
          user.runCommand("say index: " + response.formValues[0]);
          user.runCommand("say slider: " + response.formValues[1]);
          user.runCommand("say textField: " + response.formValues[2]);
          user.runCommand("say toggle Switch: " + response.formValues[3]);        
        }
      }
    });
  });
});