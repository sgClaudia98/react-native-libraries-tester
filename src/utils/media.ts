import { AdItem, AdSourceType, SourceConfig, SourceType } from "bitmovin-player-react-native";
import { Media, Publicitat } from "../types/ApiMedia";

export function getSourceConfig(media: Media, title: string, poster: string): SourceConfig {
    let selectedUrl: string | undefined;
    let selectedLabel: 'DASH' | 'HLS' | 'PROGRESSIVE' | undefined;
  
    // Buscar la URL prioritaria con label 'DASH' o 'HLS'
    for (const { file, label, active } of media.url) {
      if (active && (label === 'DASH' || label === 'HLS')) {
        selectedUrl = file;
        selectedLabel = label;
        break;
      }
    }
  
    // Si no se encontró ninguna URL con 'DASH' o 'HLS', seleccionar la primera URL activa
    if (!selectedUrl) {
      const activeUrls = media.url.filter(url => url.active);
      if (activeUrls.length > 0) {
        selectedUrl = activeUrls[0].file;
        selectedLabel = 'PROGRESSIVE';
      }
    }
  
    const sourceConfig: SourceConfig = {
      url: selectedUrl || '',
      type: selectedLabel ? SourceType[selectedLabel] : SourceType.PROGRESSIVE,
      title,
      poster
    };
  
    return sourceConfig;
  }

export function getAdItems(publicitat: Publicitat): AdItem[] {
    const adItems: AdItem[] = [];
  
    for (const key in publicitat.vast.schedule) {
       const adItem: AdItem = {
          position: publicitat.vast.schedule[key].offset.toString(),
          sources: [
            {
              tag: publicitat.vast.schedule[key].tag,
              type: AdSourceType.IMA
            },
            {
              tag: publicitat.events.adError.ad_tag_empty,
              type: AdSourceType.IMA
            }
          ]
        };
  
        adItems.push(adItem);
    }
  
    return adItems;
  }