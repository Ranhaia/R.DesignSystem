import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

export default function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Nova aba <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Nova janela <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>Nova janela anônima</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Compartilhar</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Link por e-mail</MenubarItem>
              <MenubarItem>Mensagens</MenubarItem>
              <MenubarItem>Notas</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Imprimir... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Editar</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Desfazer <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Localizar</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Buscar na web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Localizar...</MenubarItem>
              <MenubarItem>Localizar próximo</MenubarItem>
              <MenubarItem>Localizar anterior</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Recortar</MenubarItem>
          <MenubarItem>Copiar</MenubarItem>
          <MenubarItem>Colar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Visualizar</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Sempre mostrar barra de favoritos</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Sempre mostrar URLs completas
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Recarregar <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Forçar recarregamento <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Alternar tela cheia</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Ocultar barra lateral</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Perfis</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Editar...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Adicionar perfil...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
