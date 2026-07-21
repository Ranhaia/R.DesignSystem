import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Selecione um fuso horário" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>América do Norte</SelectLabel>
          <SelectItem value="est">Horário Padrão do Leste (EST)</SelectItem>
          <SelectItem value="cst">Horário Padrão Central (CST)</SelectItem>
          <SelectItem value="mst">Horário Padrão da Montanha (MST)</SelectItem>
          <SelectItem value="pst">Horário Padrão do Pacífico (PST)</SelectItem>
          <SelectItem value="akst">Horário Padrão do Alasca (AKST)</SelectItem>
          <SelectItem value="hst">Horário Padrão do Havaí (HST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europa e África</SelectLabel>
          <SelectItem value="gmt">Horário de Greenwich (GMT)</SelectItem>
          <SelectItem value="cet">Horário da Europa Central (CET)</SelectItem>
          <SelectItem value="eet">Horário da Europa Oriental (EET)</SelectItem>
          <SelectItem value="west">
            Horário de Verão da Europa Ocidental (WEST)
          </SelectItem>
          <SelectItem value="cat">Horário da África Central (CAT)</SelectItem>
          <SelectItem value="eat">Horário da África Oriental (EAT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Ásia</SelectLabel>
          <SelectItem value="msk">Horário de Moscou (MSK)</SelectItem>
          <SelectItem value="ist">Horário Padrão da Índia (IST)</SelectItem>
          <SelectItem value="cst_china">Horário Padrão da China (CST)</SelectItem>
          <SelectItem value="jst">Horário Padrão do Japão (JST)</SelectItem>
          <SelectItem value="kst">Horário Padrão da Coreia (KST)</SelectItem>
          <SelectItem value="ist_indonesia">
            Horário Padrão Central da Indonésia (WITA)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Austrália e Pacífico</SelectLabel>
          <SelectItem value="awst">
            Horário Padrão Ocidental da Austrália (AWST)
          </SelectItem>
          <SelectItem value="acst">
            Horário Padrão Central da Austrália (ACST)
          </SelectItem>
          <SelectItem value="aest">
            Horário Padrão Oriental da Austrália (AEST)
          </SelectItem>
          <SelectItem value="nzst">Horário Padrão da Nova Zelândia (NZST)</SelectItem>
          <SelectItem value="fjt">Horário de Fiji (FJT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>América do Sul</SelectLabel>
          <SelectItem value="art">Horário da Argentina (ART)</SelectItem>
          <SelectItem value="bot">Horário da Bolívia (BOT)</SelectItem>
          <SelectItem value="brt">Horário de Brasília (BRT)</SelectItem>
          <SelectItem value="clt">Horário Padrão do Chile (CLT)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
